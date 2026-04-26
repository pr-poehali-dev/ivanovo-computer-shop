import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/942617d4-7e96-4c89-b3a2-0c4203fc46b7/files/71d8f0d4-7eae-44f8-8dbf-a06349b2471d.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "about", label: "О магазине" },
  { id: "delivery", label: "Доставка" },
  { id: "warranty", label: "Гарантия" },
  { id: "contacts", label: "Контакты" },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Промышленный насос ПН-500",
    category: "Насосное оборудование",
    price: 84900,
    oldPrice: 97000,
    rating: 4.7,
    reviewCount: 34,
    badge: "Хит продаж",
    inStock: true,
  },
  {
    id: 2,
    name: "Компрессор КМ-250",
    category: "Компрессоры",
    price: 62400,
    oldPrice: null,
    rating: 4.9,
    reviewCount: 58,
    badge: "Новинка",
    inStock: true,
  },
  {
    id: 3,
    name: "Генератор ГБ-10000",
    category: "Электрогенераторы",
    price: 129900,
    oldPrice: 145000,
    rating: 4.5,
    reviewCount: 21,
    badge: null,
    inStock: true,
  },
  {
    id: 4,
    name: "Сварочный аппарат ВД-500",
    category: "Сварочное оборудование",
    price: 48200,
    oldPrice: null,
    rating: 4.6,
    reviewCount: 47,
    badge: null,
    inStock: false,
  },
  {
    id: 5,
    name: "Дробилка ДМ-800",
    category: "Дробильное оборудование",
    price: 218000,
    oldPrice: 240000,
    rating: 4.8,
    reviewCount: 12,
    badge: "Скидка",
    inStock: true,
  },
  {
    id: 6,
    name: "Конвейер ленточный КЛ-15",
    category: "Транспортное оборудование",
    price: 156000,
    oldPrice: null,
    rating: 4.4,
    reviewCount: 9,
    badge: null,
    inStock: true,
  },
];

const REVIEWS: Record<number, { author: string; date: string; rating: number; text: string }[]> = {
  1: [
    { author: "Алексей М.", date: "15 марта 2024", rating: 5, text: "Отличный насос, работает без нареканий уже полгода. Монтаж простой, документация подробная." },
    { author: "Сергей В.", date: "02 февраля 2024", rating: 4, text: "Качество хорошее, немного шумноват, но для промышленного применения — норма." },
  ],
  2: [
    { author: "Иван П.", date: "20 апреля 2024", rating: 5, text: "Лучший компрессор из тех что покупал. Надёжный, экономичный." },
  ],
  3: [
    { author: "Николай К.", date: "10 января 2024", rating: 4, text: "Хороший генератор за свои деньги. Запускается с первого раза." },
    { author: "Дмитрий Л.", date: "28 декабря 2023", rating: 5, text: "Использую на стройке, ни разу не подводил. Рекомендую." },
  ],
};

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? "hsl(28,85%,50%)" : "none"}
          stroke={star <= Math.round(rating) ? "hsl(28,85%,50%)" : "#ccc"}
          strokeWidth="1.5"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

function ReviewModal({ product, onClose }: { product: typeof PRODUCTS[0]; onClose: () => void }) {
  const reviews = REVIEWS[product.id] || [];
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in" onClick={onClose}>
      <div
        className="bg-white w-full max-w-2xl mx-4 max-h-[85vh] overflow-y-auto"
        style={{ borderTop: "4px solid hsl(28,85%,50%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-border flex items-start justify-between">
          <div>
            <h3 className="font-heading text-xl font-semibold text-foreground uppercase">{product.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={product.rating} />
              <span className="text-sm text-muted-foreground font-body">{product.rating} · {product.reviewCount} отзывов</span>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors ml-4">
            <Icon name="X" size={22} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <h4 className="font-heading text-sm font-medium uppercase tracking-wider text-muted-foreground">Отзывы покупателей</h4>
          {reviews.length === 0 && (
            <p className="text-muted-foreground font-body text-sm">Пока нет отзывов. Будьте первым!</p>
          )}
          {reviews.map((r, i) => (
            <div key={i} className="border-b border-border pb-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <span className="font-body font-medium text-sm">{r.author}</span>
                  <StarRating rating={r.rating} size={13} />
                </div>
                <span className="text-xs text-muted-foreground font-body">{r.date}</span>
              </div>
              <p className="text-sm font-body text-foreground/80 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>

        <div className="p-6 bg-muted/40 border-t border-border">
          <h4 className="font-heading text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">Оставить отзыв</h4>
          <div className="space-y-3">
            <input
              className="w-full border border-border bg-white px-3 py-2 text-sm font-body focus:outline-none focus:border-foreground transition-colors"
              placeholder="Ваше имя"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <span className="text-sm font-body text-muted-foreground">Оценка:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} onClick={() => setNewRating(s)}>
                    <svg width={20} height={20} viewBox="0 0 24 24"
                      fill={s <= newRating ? "hsl(28,85%,50%)" : "none"}
                      stroke={s <= newRating ? "hsl(28,85%,50%)" : "#ccc"}
                      strokeWidth="1.5"
                    >
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            <textarea
              className="w-full border border-border bg-white px-3 py-2 text-sm font-body focus:outline-none focus:border-foreground transition-colors resize-none"
              placeholder="Ваш отзыв о товаре..."
              rows={3}
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <button className="bg-foreground text-background px-6 py-2 text-sm font-heading uppercase tracking-wide hover:bg-foreground/90 transition-colors">
              Отправить отзыв
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onReview }: { product: typeof PRODUCTS[0]; onReview: () => void }) {
  return (
    <div className="bg-white border border-border hover-lift group">
      <div className="relative bg-muted/50 h-44 flex items-center justify-center overflow-hidden">
        <div className="text-muted-foreground/30">
          <Icon name="Package" size={64} />
        </div>
        {product.badge && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-heading uppercase px-2 py-1 tracking-wider">
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-muted-foreground font-heading text-sm uppercase tracking-widest">Нет в наличии</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="font-heading font-medium text-base text-foreground uppercase leading-tight mb-3">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} size={14} />
          <button
            onClick={onReview}
            className="text-xs text-accent hover:underline font-body"
          >
            {product.reviewCount} отзывов
          </button>
        </div>
        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="font-heading text-xl font-semibold text-foreground">
              {product.price.toLocaleString("ru-RU")} ₽
            </div>
            {product.oldPrice && (
              <div className="text-xs text-muted-foreground font-body line-through">
                {product.oldPrice.toLocaleString("ru-RU")} ₽
              </div>
            )}
          </div>
          <button
            disabled={!product.inStock}
            className="bg-foreground text-background text-xs font-heading uppercase px-4 py-2 tracking-wide hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reviewProduct, setReviewProduct] = useState<typeof PRODUCTS[0] | null>(null);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* TOP BAR */}
      <div className="bg-foreground text-background/70 text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span className="font-body">Пн–Пт: 9:00–18:00 · Сб: 10:00–15:00</span>
          <div className="hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1"><Icon name="Phone" size={11} /> +7 (800) 555-35-35</span>
            <span className="flex items-center gap-1"><Icon name="Mail" size={11} /> info@promtorg.ru</span>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="bg-white border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground flex items-center justify-center">
              <span className="text-background font-heading font-bold text-sm">ПТ</span>
            </div>
            <span className="font-heading text-xl font-semibold uppercase tracking-wider text-foreground">
              ПромТорг
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-2 text-sm font-heading uppercase tracking-wide transition-colors ${
                  activeSection === item.id
                    ? "text-accent border-b-2 border-accent"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-1.5 bg-foreground text-background text-xs font-heading uppercase px-4 py-2 tracking-wide hover:bg-accent transition-colors">
              <Icon name="ShoppingCart" size={14} />
              Корзина
            </button>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white animate-fade-in">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-4 py-3 text-sm font-heading uppercase tracking-wide border-b border-border/50 ${
                  activeSection === item.id ? "text-accent bg-muted/50" : "text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main>
        {/* HOME */}
        {activeSection === "home" && (
          <div className="animate-fade-in">
            <div className="relative min-h-[520px] bg-foreground flex items-center overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${HERO_IMAGE})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
              <div className="relative max-w-7xl mx-auto px-4 py-20">
                <div className="max-w-xl">
                  <p className="text-accent font-heading uppercase tracking-widest text-sm mb-4">Надёжный поставщик с 2008 года</p>
                  <h1 className="font-heading text-5xl md:text-6xl font-bold text-white uppercase leading-none mb-6">
                    Профессиональное<br />оборудование<br />
                    <span className="text-accent">для бизнеса</span>
                  </h1>
                  <p className="text-white/70 font-body text-base leading-relaxed mb-8">
                    Промышленное и технологическое оборудование с гарантией качества. Официальные поставщики ведущих производителей.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => scrollTo("catalog")}
                      className="bg-accent text-white font-heading uppercase text-sm px-8 py-3 tracking-wide hover:bg-accent/90 transition-colors"
                    >
                      Перейти в каталог
                    </button>
                    <button
                      onClick={() => scrollTo("contacts")}
                      className="border border-white/40 text-white font-heading uppercase text-sm px-8 py-3 tracking-wide hover:bg-white/10 transition-colors"
                    >
                      Связаться с нами
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-accent">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4">
                {[
                  { num: "1 200+", label: "Позиций в каталоге" },
                  { num: "16 лет", label: "На рынке" },
                  { num: "4 800+", label: "Клиентов" },
                  { num: "98%", label: "Довольных покупателей" },
                ].map((s, i) => (
                  <div key={i} className="text-center py-6 px-4 border-r border-white/20 last:border-r-0">
                    <div className="font-heading text-3xl font-bold text-white">{s.num}</div>
                    <div className="text-white/80 text-xs font-body uppercase tracking-wider mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
              <div className="mb-10">
                <div className="section-divider mb-4" />
                <h2 className="font-heading text-3xl font-semibold uppercase">Почему выбирают нас</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: "ShieldCheck", title: "Гарантия качества", desc: "Официальные сертификаты на всё оборудование. Гарантия до 3 лет." },
                  { icon: "Truck", title: "Быстрая доставка", desc: "Доставка по всей России. Собственный автопарк и транспортные партнёры." },
                  { icon: "Headphones", title: "Техническая поддержка", desc: "Консультации специалистов 6 дней в неделю. Выезд инженера при необходимости." },
                ].map((f, i) => (
                  <div key={i} className="border border-border p-6 hover-lift">
                    <div className="w-10 h-10 bg-foreground flex items-center justify-center mb-4">
                      <Icon name={f.icon} size={20} className="text-background" />
                    </div>
                    <h3 className="font-heading text-base font-semibold uppercase mb-2">{f.title}</h3>
                    <p className="text-sm font-body text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted/40 py-16">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-end justify-between mb-10">
                  <div>
                    <div className="section-divider mb-4" />
                    <h2 className="font-heading text-3xl font-semibold uppercase">Популярные товары</h2>
                  </div>
                  <button onClick={() => scrollTo("catalog")} className="text-sm font-heading uppercase text-accent hover:underline tracking-wide hidden md:block">
                    Весь каталог →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {PRODUCTS.slice(0, 3).map((p) => (
                    <ProductCard key={p.id} product={p} onReview={() => setReviewProduct(p)} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CATALOG */}
        {activeSection === "catalog" && (
          <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
            <div className="mb-10">
              <div className="section-divider mb-4" />
              <h2 className="font-heading text-3xl font-semibold uppercase">Каталог оборудования</h2>
              <p className="text-muted-foreground font-body mt-2">Более 1 200 позиций профессионального оборудования</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {["Все категории", "Насосы", "Компрессоры", "Генераторы", "Сварочное", "Дробильное", "Транспортное"].map((cat, i) => (
                <button
                  key={cat}
                  className={`px-4 py-1.5 text-xs font-heading uppercase tracking-wide border transition-colors ${
                    i === 0
                      ? "bg-foreground text-background border-foreground"
                      : "bg-white text-foreground border-border hover:border-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PRODUCTS.map((p) => (
                <ProductCard key={p.id} product={p} onReview={() => setReviewProduct(p)} />
              ))}
            </div>
          </div>
        )}

        {/* ABOUT */}
        {activeSection === "about" && (
          <div className="animate-fade-in">
            <div className="bg-foreground text-background py-16">
              <div className="max-w-7xl mx-auto px-4">
                <div className="section-divider mb-4" style={{ borderColor: "hsl(28,85%,50%)" }} />
                <h2 className="font-heading text-4xl font-bold uppercase text-white">О компании</h2>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-14">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <p className="font-body text-base text-foreground/80 leading-relaxed mb-6">
                    <strong className="font-heading text-foreground">ПромТорг</strong> — ведущий поставщик промышленного и технологического оборудования. С 2008 года мы помогаем производственным компаниям, строительным организациям и сервисным центрам по всей России.
                  </p>
                  <p className="font-body text-base text-foreground/80 leading-relaxed mb-6">
                    Мы работаем напрямую с производителями, что позволяет предлагать конкурентные цены без скрытых наценок. Каждая единица оборудования проходит входной контроль качества.
                  </p>
                  <div className="border-l-4 border-accent pl-4 mb-6">
                    <p className="font-body italic text-foreground/70">
                      «Наша цель — чтобы каждый клиент получил именно то оборудование, которое решит его задачи, в срок и по честной цене.»
                    </p>
                    <p className="text-sm font-heading text-muted-foreground mt-2 uppercase tracking-wide">— Директор компании</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: "Building2", title: "Официальный дистрибьютор", desc: "Авторизованный партнёр 40+ производителей оборудования" },
                    { icon: "Award", title: "Сертифицированная продукция", desc: "Вся продукция имеет сертификаты ГОСТ и технические паспорта" },
                    { icon: "Users", title: "Команда профессионалов", desc: "75 сотрудников, из них 20 дипломированных инженеров" },
                    { icon: "MapPin", title: "Склад в Москве", desc: "Собственный склад площадью 3 500 м² с товаром в наличии" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 border border-border">
                      <div className="w-9 h-9 bg-foreground flex-shrink-0 flex items-center justify-center">
                        <Icon name={item.icon} size={16} className="text-background" />
                      </div>
                      <div>
                        <div className="font-heading text-sm font-semibold uppercase">{item.title}</div>
                        <div className="text-sm text-muted-foreground font-body mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DELIVERY */}
        {activeSection === "delivery" && (
          <div className="animate-fade-in">
            <div className="bg-foreground text-background py-16">
              <div className="max-w-7xl mx-auto px-4">
                <div className="section-divider mb-4" style={{ borderColor: "hsl(28,85%,50%)" }} />
                <h2 className="font-heading text-4xl font-bold uppercase text-white">Доставка</h2>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-14">
              <div className="grid md:grid-cols-3 gap-6 mb-14">
                {[
                  { icon: "Truck", title: "Москва и МО", price: "от 990 ₽", time: "1–2 рабочих дня", desc: "Собственная служба доставки, подъём на этаж — бесплатно" },
                  { icon: "Package", title: "Регионы России", price: "по тарифу ТК", time: "3–7 рабочих дней", desc: "СДЭК, Деловые Линии, Энергия и другие перевозчики" },
                  { icon: "Globe", title: "Самовывоз", price: "Бесплатно", time: "После подтверждения", desc: "Склад: Москва, ул. Промышленная, 12, пн–пт 9–18" },
                ].map((d, i) => (
                  <div key={i} className="border border-border p-6">
                    <div className="w-10 h-10 bg-foreground flex items-center justify-center mb-4">
                      <Icon name={d.icon} size={18} className="text-background" />
                    </div>
                    <h3 className="font-heading text-base font-semibold uppercase mb-1">{d.title}</h3>
                    <div className="text-accent font-heading text-lg font-bold mb-1">{d.price}</div>
                    <div className="text-xs text-muted-foreground font-body mb-3">{d.time}</div>
                    <p className="text-sm font-body text-muted-foreground">{d.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-muted/40 border border-border p-6">
                <h3 className="font-heading text-base font-semibold uppercase mb-4">Важная информация</h3>
                <ul className="space-y-3">
                  {[
                    "Бесплатная доставка при заказе от 150 000 ₽ по Москве и МО",
                    "Крупногабаритное оборудование доставляется спецтранспортом с предварительным согласованием",
                    "Возможна срочная доставка на следующий день — уточняйте у менеджера",
                    "Страхование груза включено в стоимость доставки",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-body text-foreground/80">
                      <Icon name="CheckCircle" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* WARRANTY */}
        {activeSection === "warranty" && (
          <div className="animate-fade-in">
            <div className="bg-foreground text-background py-16">
              <div className="max-w-7xl mx-auto px-4">
                <div className="section-divider mb-4" style={{ borderColor: "hsl(28,85%,50%)" }} />
                <h2 className="font-heading text-4xl font-bold uppercase text-white">Гарантия</h2>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-14">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-heading text-xl font-semibold uppercase mb-6">Условия гарантийного обслуживания</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Насосы и компрессоры", period: "24 месяца" },
                      { title: "Генераторы и электрооборудование", period: "18 месяцев" },
                      { title: "Сварочное оборудование", period: "12 месяцев" },
                      { title: "Дробильное и конвейерное", period: "12 месяцев" },
                    ].map((w, i) => (
                      <div key={i} className="flex items-center justify-between py-3 border-b border-border">
                        <span className="font-body text-sm text-foreground/80">{w.title}</span>
                        <span className="font-heading font-semibold text-accent">{w.period}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-5 bg-accent/10 border border-accent/30">
                    <div className="flex items-start gap-3">
                      <Icon name="ShieldCheck" size={22} className="text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-heading text-sm font-semibold uppercase mb-1">Расширенная гарантия</div>
                        <p className="text-sm font-body text-muted-foreground">
                          При покупке от 100 000 ₽ доступна расширенная гарантия на 3 года с выездом инженера.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold uppercase mb-6">Как воспользоваться гарантией</h3>
                  <div className="space-y-4">
                    {[
                      { step: "01", title: "Обратитесь к нам", desc: "Позвоните или напишите на почту, опишите неисправность" },
                      { step: "02", title: "Диагностика", desc: "Наш инженер проведёт диагностику в течение 2 рабочих дней" },
                      { step: "03", title: "Ремонт или замена", desc: "Бесплатный ремонт или замена оборудования при гарантийном случае" },
                    ].map((s, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="font-heading text-3xl font-bold text-muted-foreground/30 w-10 flex-shrink-0">{s.step}</div>
                        <div className="border-l border-border pl-4 pb-4">
                          <div className="font-heading text-sm font-semibold uppercase mb-1">{s.title}</div>
                          <p className="text-sm font-body text-muted-foreground">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTACTS */}
        {activeSection === "contacts" && (
          <div className="animate-fade-in">
            <div className="bg-foreground text-background py-16">
              <div className="max-w-7xl mx-auto px-4">
                <div className="section-divider mb-4" style={{ borderColor: "hsl(28,85%,50%)" }} />
                <h2 className="font-heading text-4xl font-bold uppercase text-white">Контакты</h2>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-14">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  {[
                    { icon: "Phone", label: "Телефон", value: "+7 (800) 555-35-35", sub: "Бесплатно по России" },
                    { icon: "Mail", label: "Email", value: "info@promtorg.ru", sub: "Отвечаем в течение часа" },
                    { icon: "MapPin", label: "Адрес", value: "Москва, ул. Промышленная, 12", sub: "Пн–Пт 9:00–18:00, Сб 10:00–15:00" },
                    { icon: "MessageSquare", label: "WhatsApp / Telegram", value: "+7 (916) 123-45-67", sub: "Для быстрой связи" },
                  ].map((c, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 bg-foreground flex-shrink-0 flex items-center justify-center">
                        <Icon name={c.icon} size={16} className="text-background" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground font-body uppercase tracking-wider">{c.label}</div>
                        <div className="font-heading font-medium text-base">{c.value}</div>
                        <div className="text-xs text-muted-foreground font-body mt-0.5">{c.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border border-border p-6">
                  <h3 className="font-heading text-base font-semibold uppercase mb-5">Оставить заявку</h3>
                  <div className="space-y-3">
                    <input className="w-full border border-border bg-background px-3 py-2.5 text-sm font-body focus:outline-none focus:border-foreground transition-colors" placeholder="Ваше имя" />
                    <input className="w-full border border-border bg-background px-3 py-2.5 text-sm font-body focus:outline-none focus:border-foreground transition-colors" placeholder="Телефон или email" />
                    <textarea className="w-full border border-border bg-background px-3 py-2.5 text-sm font-body focus:outline-none focus:border-foreground transition-colors resize-none" rows={4} placeholder="Опишите вашу задачу или вопрос..." />
                    <button className="w-full bg-foreground text-background font-heading uppercase text-sm py-3 tracking-wide hover:bg-accent transition-colors">
                      Отправить заявку
                    </button>
                    <p className="text-xs text-muted-foreground font-body text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-foreground text-background/70 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-accent flex items-center justify-center">
                  <span className="text-white font-heading font-bold text-sm">ПТ</span>
                </div>
                <span className="font-heading text-lg font-semibold uppercase tracking-wider text-white">ПромТорг</span>
              </div>
              <p className="text-sm font-body leading-relaxed">Профессиональное оборудование для вашего бизнеса с 2008 года.</p>
            </div>
            <div>
              <h4 className="font-heading text-xs uppercase tracking-widest text-white mb-3">Навигация</h4>
              <ul className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button onClick={() => scrollTo(item.id)} className="text-sm font-body hover:text-white transition-colors">
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-xs uppercase tracking-widest text-white mb-3">Контакты</h4>
              <ul className="space-y-2 text-sm font-body">
                <li>+7 (800) 555-35-35</li>
                <li>info@promtorg.ru</li>
                <li>Москва, ул. Промышленная, 12</li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-xs uppercase tracking-widest text-white mb-3">Режим работы</h4>
              <ul className="space-y-2 text-sm font-body">
                <li>Пн–Пт: 9:00–18:00</li>
                <li>Сб: 10:00–15:00</li>
                <li>Вс: выходной</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-xs font-body">© 2024 ПромТорг. Все права защищены.</p>
            <p className="text-xs font-body">ИНН 7700000000 · ОГРН 1080000000000</p>
          </div>
        </div>
      </footer>

      {reviewProduct && (
        <ReviewModal product={reviewProduct} onClose={() => setReviewProduct(null)} />
      )}
    </div>
  );
};

export default Index;