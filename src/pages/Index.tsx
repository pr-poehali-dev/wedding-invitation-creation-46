import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const WEDDING_DATE = new Date('2026-07-25T14:30:00');

const Rings = () => (
  <img
    src="https://cdn.poehali.dev/projects/e7528ddf-4cfe-43fc-a9d5-7347760773b7/files/3394ef26-8300-4835-a6eb-d73a0341d5c9.jpg"
    alt="сердце"
    className="w-44 md:w-56 mx-auto mb-6 animate-float mix-blend-multiply opacity-90"
  />
);

const useCountdown = () => {
  const calc = () => {
    const diff = WEDDING_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
};

const CountUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm">
      <span className="font-display text-3xl md:text-4xl font-light text-foreground">
        {String(value).padStart(2, '0')}
      </span>
    </div>
    <span className="font-body text-[9px] uppercase tracking-[0.2em] text-[hsl(var(--rose))]">{label}</span>
  </div>
);

const Divider = () => (
  <div className="flex items-center justify-center gap-4 my-10">
    <span className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--gold)))' }} />
    <Icon name="Gem" size={14} className="text-[hsl(var(--gold))] opacity-70" />
    <span className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(90deg, hsl(var(--gold)), transparent)' }} />
  </div>
);

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-3xl bg-white/35 backdrop-blur-md border border-white/60 shadow-sm hover:shadow-md hover:bg-white/50 transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const timeline = [
  { time: '14:00', title: 'Сбор гостей', icon: 'Users' },
  { time: '14:30', title: 'Регистрация', icon: 'Heart' },
  { time: '15:00', title: 'Фотосессия и размещение', icon: 'Camera' },
  { time: '17:00', title: 'Семейный ужин', icon: 'Wine' },
  { time: '23:00', title: 'Завершение вечера', icon: 'Moon' },
];

const Index = () => {
  const countdown = useCountdown();

  return (
    <div className="min-h-screen invite-card text-foreground overflow-x-hidden">
      <div className="max-w-xl mx-auto px-5 pb-20">

        {/* HERO */}
        <header className="pt-16 text-center">
          <Rings />
          <p
            className="font-body text-xs uppercase tracking-[0.35em] text-[hsl(var(--rose))/70] mb-6 animate-fade-up"
            style={{ animationDelay: '.1s', opacity: 0 }}
          >
            приглашение на свадьбу
          </p>
          <h1
            className="font-display font-light animate-fade-up"
            style={{ fontSize: 'clamp(3.5rem, 14vw, 6rem)', lineHeight: 1.05, letterSpacing: '-0.01em', animationDelay: '.25s', opacity: 0 }}
          >
            Андрей
          </h1>
          <p
            className="font-hand text-3xl text-[hsl(var(--gold))] my-2 animate-fade-up"
            style={{ animationDelay: '.4s', opacity: 0 }}
          >
            &amp;
          </p>
          <h1
            className="font-display font-light animate-fade-up"
            style={{ fontSize: 'clamp(3.5rem, 14vw, 6rem)', lineHeight: 1.05, letterSpacing: '-0.01em', animationDelay: '.5s', opacity: 0 }}
          >
            Виола
          </h1>
          <p
            className="font-body text-xs uppercase tracking-[0.3em] text-[hsl(var(--rose))/60] mt-8 animate-fade-up"
            style={{ animationDelay: '.65s', opacity: 0 }}
          >
            25 · 07 · 2026
          </p>
        </header>

        {/* КАЛЕНДАРЬ */}
        <section className="mt-12 animate-fade-in">
          <div className="rounded-3xl overflow-hidden max-w-xs mx-auto shadow-sm" style={{ background: 'hsla(38,35%,92%,0.7)', backdropFilter: 'blur(12px)', border: '1px solid hsla(38,40%,85%,0.6)' }}>
            {/* Шапка месяца */}
            <div className="px-6 py-5 text-center" style={{ background: 'linear-gradient(135deg, hsla(38,45%,85%,0.9), hsla(30,40%,88%,0.9))' }}>
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-[hsl(var(--gold))] mb-1">2026</p>
              <p className="font-display text-3xl font-light tracking-wide" style={{ color: 'hsl(30,20%,32%)' }}>Июль</p>
            </div>
            {/* Дни недели */}
            <div className="grid grid-cols-7 px-3 pt-3 pb-1">
              {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(d => (
                <div key={d} className="text-center font-body text-[9px] uppercase tracking-wider py-1" style={{ color: 'hsla(30,15%,45%,0.6)' }}>{d}</div>
              ))}
            </div>
            {/* Дни */}
            <div className="grid grid-cols-7 px-3 pb-4 gap-y-1">
              {[null, null, 1,2,3,4,5, 6,7,8,9,10,11,12, 13,14,15,16,17,18,19, 20,21,22,23,24,25,26, 27,28,29,30,31,null,null].map((day, i) => (
                <div key={i} className="flex items-center justify-center">
                  {day ? (
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full font-body text-sm transition-all
                      ${day === 25
                        ? 'shadow-md scale-110 text-white font-medium'
                        : ''
                      }`}
                      style={day === 25
                        ? { background: 'linear-gradient(135deg, hsl(var(--rose)), hsl(var(--gold)))' }
                        : { color: 'hsla(30,18%,35%,0.7)' }
                      }
                    >
                      {day}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            {/* Подпись */}
            <div className="px-6 py-3 text-center" style={{ borderTop: '1px solid hsla(38,35%,78%,0.5)' }}>
              <p className="font-hand text-lg text-[hsl(var(--rose))]">наш день ♡</p>
            </div>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section className="mt-8 text-center animate-fade-in">
          <p className="font-hand text-xl text-[hsl(var(--rose))] mb-6 opacity-80">до нашей свадьбы осталось</p>
          <div className="flex justify-center items-start gap-3">
            <CountUnit value={countdown.days} label="дней" />
            <span className="font-display text-2xl text-[hsl(var(--gold))] opacity-60 mt-4">:</span>
            <CountUnit value={countdown.hours} label="часов" />
            <span className="font-display text-2xl text-[hsl(var(--gold))] opacity-60 mt-4">:</span>
            <CountUnit value={countdown.minutes} label="минут" />
            <span className="font-display text-2xl text-[hsl(var(--gold))] opacity-60 mt-4">:</span>
            <CountUnit value={countdown.seconds} label="секунд" />
          </div>
        </section>

        <Divider />

        {/* ФОТО */}
        <section>
          <div className="grid grid-cols-2 gap-3">
            <div className="group relative overflow-hidden rounded-3xl aspect-[3/4] shadow-sm">
              <img
                src="https://cdn.poehali.dev/projects/e7528ddf-4cfe-43fc-a9d5-7347760773b7/bucket/bd1f7dc2-fc7f-4d56-bf8c-aa5967c21226.jpeg"
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <p className="absolute bottom-4 left-0 right-0 text-center font-hand text-white text-lg px-3 leading-snug">
                там, где расцветает любовь
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-3xl aspect-[3/4] shadow-sm mt-8">
              <img
                src="https://cdn.poehali.dev/projects/e7528ddf-4cfe-43fc-a9d5-7347760773b7/bucket/68068d68-80b7-4e5e-a9f2-704d6057d3ae.jpeg"
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <p className="absolute bottom-4 left-0 right-0 text-center font-hand text-white text-lg px-3 leading-snug">
                на вершине мира — вместе
              </p>
            </div>
          </div>
        </section>

        <Divider />

        {/* ТЕКСТ */}
        <section className="text-center px-2">
          <p className="font-display text-xl md:text-2xl font-light leading-relaxed text-foreground/70">
            Дорогие друзья и близкие! С трепетом и радостью в сердце мы хотим разделить с вами один из самых важных дней нашей жизни. Будем счастливы видеть вас в этот особенный день.
          </p>
        </section>

        <Divider />

        {/* ДАТА + МЕСТА */}
        <section className="flex flex-col gap-4">
          <Card className="p-7 text-center">
            <Icon name="CalendarDays" size={28} className="mx-auto text-[hsl(var(--gold))] mb-3" />
            <p className="font-body text-xs uppercase tracking-[0.25em] text-foreground/50 mb-1">дата и время</p>
            <p className="font-display text-3xl font-light">25 июля 2026</p>
            <p className="font-hand text-xl text-[hsl(var(--rose))] mt-1">суббота · 14:30</p>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <a
              href="https://maps.google.com/?q=г.+Новороссийск,+пр.+Дзержинского,+197"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="p-6 text-center h-full flex flex-col items-center justify-center cursor-pointer">
                <Icon name="Heart" size={24} className="text-[hsl(var(--rose))] mb-3" />
                <p className="font-body text-xs uppercase tracking-[0.2em] text-foreground/50 mb-1">регистрация</p>
                <p className="font-display text-lg font-light leading-tight">Торжественная<br />церемония</p>
                <p className="font-body text-xs text-foreground/50 mt-3 leading-relaxed">пр. Дзержинского, 197</p>
                <p className="font-body text-[10px] text-[hsl(var(--gold))] mt-3 tracking-wider uppercase">на карте →</p>
              </Card>
            </a>
            <a
              href="https://maps.google.com/?q=г.+Новороссийск,+переулок+Ясный,+1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="p-6 text-center h-full flex flex-col items-center justify-center cursor-pointer">
                <Icon name="Wine" size={24} className="text-[hsl(var(--rose))] mb-3" />
                <p className="font-body text-xs uppercase tracking-[0.2em] text-foreground/50 mb-1">ужин</p>
                <p className="font-display text-lg font-light leading-tight">Ресторан<br />«Виноград»</p>
                <p className="font-body text-xs text-foreground/50 mt-3 leading-relaxed">переулок Ясный, 1</p>
                <p className="font-body text-[10px] text-[hsl(var(--gold))] mt-3 tracking-wider uppercase">на карте →</p>
              </Card>
            </a>
          </div>
        </section>

        <Divider />

        {/* ТАЙМИНГ */}
        <section>
          <p className="font-body text-xs uppercase tracking-[0.25em] text-foreground/50 text-center mb-2">план дня</p>
          <h2 className="font-display text-4xl text-center font-light mb-8">Как пройдёт праздник</h2>
          <div className="flex flex-col gap-3">
            {timeline.map((t, i) => (
              <Card key={t.time} className="p-5 flex items-center gap-5">
                <div className="w-10 h-10 rounded-2xl bg-white/50 flex items-center justify-center flex-shrink-0">
                  <Icon name={t.icon} size={18} className="text-[hsl(var(--gold))]" />
                </div>
                <div className="flex-1">
                  <span className="font-display text-xl font-light">{t.title}</span>
                </div>
                <span className="font-body text-xs tracking-widest text-[hsl(var(--rose))] opacity-70 flex-shrink-0">{t.time}</span>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* ПРИМЕЧАНИЕ */}
        <section>
          <Card className="p-7 text-center">
            <Icon name="Wind" size={26} className="mx-auto text-[hsl(var(--gold))] mb-3" />
            <p className="font-body text-xs uppercase tracking-[0.25em] text-foreground/50 mb-3">примечание</p>
            <p className="font-display text-lg font-light leading-relaxed text-foreground/75">
              Наша свадьба состоится на открытом воздухе.
            </p>
            <p className="font-body text-xs text-foreground/50 mt-4">
              Просим подтвердить присутствие до <span className="text-[hsl(var(--rose))]">10 июля</span>
            </p>
          </Card>
        </section>

        <Divider />

        {/* КОНТАКТЫ */}
        <section className="text-center">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-foreground/50 mb-2">контакты</p>
          <h2 className="font-display text-4xl font-light mb-7">Будем рады ответить</h2>
          <div className="flex flex-col gap-3">
            <a href="tel:+79186443306">
              <Card className="p-5 flex items-center justify-between px-7 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white/50 flex items-center justify-center">
                    <Icon name="Phone" size={16} className="text-[hsl(var(--gold))]" />
                  </div>
                  <div className="text-left">
                    <p className="font-display text-xl font-light">Виола</p>
                    <p className="font-body text-xs text-foreground/50 tracking-wide">+7 918 644 33 06</p>
                  </div>
                </div>
                <Icon name="ChevronRight" size={16} className="text-foreground/30" />
              </Card>
            </a>
            <a href="tel:+79181368077">
              <Card className="p-5 flex items-center justify-between px-7 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white/50 flex items-center justify-center">
                    <Icon name="Phone" size={16} className="text-[hsl(var(--gold))]" />
                  </div>
                  <div className="text-left">
                    <p className="font-display text-xl font-light">Андрей</p>
                    <p className="font-body text-xs text-foreground/50 tracking-wide">+7 918 136 80 77</p>
                  </div>
                </div>
                <Icon name="ChevronRight" size={16} className="text-foreground/30" />
              </Card>
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center pt-16 pb-4">
          <Rings />
          <p className="font-hand text-3xl text-[hsl(var(--rose))] opacity-80">Ждём вас с любовью</p>
          <p className="font-body text-xs text-foreground/30 tracking-widest uppercase mt-4">Виола & Андрей · 25.07.2026</p>
        </footer>

      </div>
    </div>
  );
};

export default Index;