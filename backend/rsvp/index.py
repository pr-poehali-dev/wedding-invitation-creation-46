import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Сохранение и получение RSVP-ответов гостей свадьбы"""
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    if event.get('httpMethod') == 'POST':
        body = json.loads(event.get('body') or '{}')
        name = body.get('name', '').strip()
        attending = body.get('attending', True)
        guests_count = int(body.get('guests_count', 1))
        comment = body.get('comment', '').strip()

        if not name:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Имя обязательно'})}

        cur.execute(
            "INSERT INTO rsvp (name, attending, guests_count, comment) VALUES (%s, %s, %s, %s) RETURNING id",
            (name, attending, guests_count, comment or None)
        )
        rsvp_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'success': True, 'id': rsvp_id})}

    if event.get('httpMethod') == 'GET':
        cur.execute("SELECT id, name, attending, guests_count, comment, created_at FROM rsvp ORDER BY created_at DESC")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        result = [
            {'id': r[0], 'name': r[1], 'attending': r[2], 'guests_count': r[3], 'comment': r[4], 'created_at': str(r[5])}
            for r in rows
        ]
        return {'statusCode': 200, 'headers': headers, 'body': json.dumps(result)}

    return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Method not allowed'})}
