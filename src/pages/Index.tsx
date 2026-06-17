import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const Rings = () => (
  <svg viewBox="0 0 200 120" className="w-48 md:w-64 mx-auto mb-4 animate-float" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="72" cy="60" r="44" stroke="hsla(200,40%,72%,0.9)" strokeWidth="7" fill="none"/>
    <circle cx="72" cy="60" r="44" stroke="hsla(0,0%,100%,0.4)" strokeWidth="2" fill="none" strokeDasharray="4 8"/>
    <circle cx="128" cy="60" r="44" stroke="hsla(38,45%,70%,0.9)" strokeWidth="7" fill="none"/>
    <circle cx="128" cy="60" r="44" stroke="hsla(0,0%,100%,0.4)" strokeWidth="2" fill="none" strokeDasharray="4 8"/>
    <circle cx="80" cy="34" r="4" fill="hsla(0,0%,100%,0.85)"/>
    <circle cx="122" cy="88" r="3" fill="hsla(0,0%,100%,0.7)"/>
  </svg>
);
const WEDDING_DATE = new Date('2026-07-25T14:30:00');

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
  <div className="flex flex-col items-center">
    <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl bg-white/60 border border-[hsl(var(--champagne))] shadow-sm">
      <span className="font-display text-3xl md:text-4xl font-light text-foreground">
        {String(value).padStart(2, '0')}
      </span>
    </div>
    <span className="font-body text-[10px] uppercase tracking-widest text-[hsl(var(--rose))] mt-2">{label}</span>
  </div>
);

const Divider = () => (
  <div className="flex items-center justify-center gap-3 my-8 animate-fade-in">
    <span className="h-px w-16 divider-line" />
    <Icon name="Heart" size={16} className="text-[hsl(var(--rose))]" />
    <span className="h-px w-16 divider-line" />
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
      <div className="max-w-2xl mx-auto px-6">

        {/* HERO */}
        <header className="relative pt-10 text-center">
          <Rings />
          <p className="font-hand text-2xl text-[hsl(var(--rose))] animate-fade-up" style={{ animationDelay: '.1s', opacity: 0 }}>
            Мы приглашаем вас на нашу свадьбу
          </p>
          <h1
            className="font-display text-6xl md:text-8xl font-light tracking-wide mt-4 animate-fade-up"
            style={{ animationDelay: '.3s', opacity: 0 }}
          >
            Виола
          </h1>
          <p className="font-hand text-4xl text-[hsl(var(--gold))] my-1 animate-fade-up" style={{ animationDelay: '.45s', opacity: 0 }}>
            &amp;
          </p>
          <h1
            className="font-display text-6xl md:text-8xl font-light tracking-wide animate-fade-up"
            style={{ animationDelay: '.55s', opacity: 0 }}
          >
            Андрей
          </h1>
          <p className="font-body uppercase tracking-[0.4em] text-sm text-[hsl(var(--rose))] mt-6 animate-fade-up" style={{ animationDelay: '.7s', opacity: 0 }}>
            25 · 07 · 2026
          </p>
        </header>

        {/* ОБРАТНЫЙ ОТСЧЁТ */}
        <section className="text-center mt-10 animate-fade-in">
          <p className="font-hand text-2xl text-[hsl(var(--rose))] mb-5">до нашей свадьбы осталось</p>
          <div className="flex justify-center gap-4">
            <CountUnit value={countdown.days} label="дней" />
            <div className="font-display text-3xl text-[hsl(var(--gold))] self-start pt-3">:</div>
            <CountUnit value={countdown.hours} label="часов" />
            <div className="font-display text-3xl text-[hsl(var(--gold))] self-start pt-3">:</div>
            <CountUnit value={countdown.minutes} label="минут" />
            <div className="font-display text-3xl text-[hsl(var(--gold))] self-start pt-3">:</div>
            <CountUnit value={countdown.seconds} label="секунд" />
          </div>
        </section>

        <Divider />

        {/* ФОТО */}
        <section className="animate-fade-in">
          <div className="grid grid-cols-2 gap-4">
            <div className="group relative overflow-hidden rounded-3xl aspect-[3/4] shadow-md hover:shadow-xl transition-shadow">
              <img
                src="https://cdn.poehali.dev/projects/e7528ddf-4cfe-43fc-a9d5-7347760773b7/bucket/bd1f7dc2-fc7f-4d56-bf8c-aa5967c21226.jpeg"
                alt=""
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-0 right-0 text-center font-hand text-white text-xl px-3 leading-snug drop-shadow">
                там, где расцветает любовь
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-3xl aspect-[3/4] shadow-md hover:shadow-xl transition-shadow mt-8">
              <img
                src="https://cdn.poehali.dev/projects/e7528ddf-4cfe-43fc-a9d5-7347760773b7/bucket/68068d68-80b7-4e5e-a9f2-704d6057d3ae.jpeg"
                alt=""
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-0 right-0 text-center font-hand text-white text-xl px-3 leading-snug drop-shadow">
                на вершине мира — вместе
              </p>
            </div>
          </div>
        </section>

        <Divider />

        {/* ОСНОВНАЯ ИНФОРМАЦИЯ */}
        <section className="text-center animate-fade-in">
          <p className="font-display text-2xl md:text-3xl font-light leading-relaxed text-foreground/80">
            Дорогие друзья и близкие! С трепетом и радостью в сердце мы хотим
            разделить с вами один из самых важных дней нашей жизни.
            Будем счастливы видеть вас в этот особенный день.
          </p>
        </section>

        <Divider />

        {/* ДАТА И ВРЕМЯ + МЕСТА */}
        <section className="flex flex-col gap-6">
          <div className="rounded-2xl border border-[hsl(var(--champagne))] bg-white/50 backdrop-blur-sm p-8 text-center hover:shadow-lg transition-shadow">
            <Icon name="CalendarHeart" size={32} className="mx-auto text-[hsl(var(--gold))]" />
            <h3 className="font-display text-3xl mt-3 mb-1">Дата и время</h3>
            <p className="font-hand text-3xl text-[hsl(var(--rose))]">25 июля 2026</p>
            <p className="font-body text-sm tracking-wider text-foreground/70 mt-1">суббота · 14:30</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://maps.google.com/?q=г.+Новороссийск,+пр.+Дзержинского,+197"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-[hsl(var(--champagne))] bg-white/50 backdrop-blur-sm p-8 text-center hover:shadow-lg transition-shadow block"
            >
              <Icon name="Heart" size={32} className="mx-auto text-[hsl(var(--gold))]" />
              <h3 className="font-display text-2xl mt-3 mb-1">Регистрация брака</h3>
              <p className="font-hand text-xl text-[hsl(var(--rose))] mt-1">Торжественная церемония</p>
              <p className="font-body text-sm text-foreground/60 mt-2 leading-relaxed">г. Новороссийск<br />пр. Дзержинского, 197</p>
              <p className="font-body text-xs text-[hsl(var(--gold))] mt-3 tracking-wider uppercase">Открыть на карте →</p>
            </a>
            <a
              href="https://maps.google.com/?q=г.+Новороссийск,+переулок+Ясный,+1"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-[hsl(var(--champagne))] bg-white/50 backdrop-blur-sm p-8 text-center hover:shadow-lg transition-shadow block"
            >
              <Icon name="Wine" size={32} className="mx-auto text-[hsl(var(--gold))]" />
              <h3 className="font-display text-2xl mt-3 mb-1">Семейный ужин</h3>
              <p className="font-hand text-xl text-[hsl(var(--rose))] mt-1">Ресторан «Виноград»</p>
              <p className="font-body text-sm text-foreground/60 mt-2 leading-relaxed">г. Новороссийск<br />переулок Ясный, 1</p>
              <p className="font-body text-xs text-[hsl(var(--gold))] mt-3 tracking-wider uppercase">Открыть на карте →</p>
            </a>
          </div>
        </section>

        <Divider />

        {/* ТАЙМИНГ */}
        <section className="animate-fade-in">
          <h2 className="font-display text-4xl text-center mb-2">План дня</h2>
          <p className="text-center font-hand text-2xl text-[hsl(var(--rose))] mb-8">как пройдёт наш праздник</p>
          <div className="relative">
            <span className="absolute left-1/2 top-0 bottom-0 w-px bg-[hsl(var(--champagne))] -translate-x-1/2" />
            <div className="space-y-6">
              {timeline.map((t, i) => (
                <div
                  key={t.time}
                  className={`relative flex items-center gap-4 ${i % 2 ? 'md:flex-row-reverse md:text-right' : ''}`}
                >
                  <div className="flex-1 md:px-8">
                    <div className="inline-flex items-center gap-3 rounded-full bg-white/60 border border-[hsl(var(--champagne))] px-5 py-3">
                      <Icon name={t.icon} size={20} className="text-[hsl(var(--gold))]" />
                      <span className="font-body text-sm tracking-widest text-[hsl(var(--rose))]">{t.time}</span>
                      <span className="font-display text-xl">{t.title}</span>
                    </div>
                  </div>
                  <span className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[hsl(var(--gold))] ring-4 ring-[hsl(var(--background))]" />
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ПРИМЕЧАНИЕ */}
        <section className="rounded-2xl bg-[hsl(var(--blush))]/30 border border-[hsl(var(--blush))] p-8 text-center animate-fade-in">
          <Icon name="Info" size={28} className="mx-auto text-[hsl(var(--gold))] mb-2" />
          <h3 className="font-display text-3xl mb-3">Примечание</h3>
          <p className="font-body text-sm leading-relaxed text-foreground/75">
            Наша свадьба состоится на открытом воздухе. Пожалуйста, захватите
            что-то тёплое, чтобы не замёрзнуть. Мы подготовим пледы на случай,
            если вам станет холодно.
            <br /><br />
            Просим подтвердить присутствие до <span className="text-[hsl(var(--rose))]">10 июля</span>.
          </p>
        </section>

        <Divider />

        {/* КОНТАКТЫ */}
        <section className="text-center animate-fade-in">
          <h2 className="font-display text-4xl mb-6">Контакты</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="tel:+79186443306" className="group flex items-center justify-center gap-3 rounded-full border border-[hsl(var(--champagne))] bg-white/50 px-6 py-4 hover:bg-white transition-colors">
              <Icon name="Phone" size={20} className="text-[hsl(var(--gold))]" />
              <span className="font-display text-xl">Виола · +7 918 644 33 06</span>
            </a>
            <a href="tel:+79181368077" className="group flex items-center justify-center gap-3 rounded-full border border-[hsl(var(--champagne))] bg-white/50 px-6 py-4 hover:bg-white transition-colors">
              <Icon name="Phone" size={20} className="text-[hsl(var(--gold))]" />
              <span className="font-display text-xl">Андрей · +7 918 136 80 77</span>
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center py-14">
          <Rings />
          <p className="font-hand text-3xl text-[hsl(var(--rose))]">Ждём вас с любовью</p>
        </footer>

      </div>
    </div>
  );
};

export default Index;