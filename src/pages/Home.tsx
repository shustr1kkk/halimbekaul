import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start"
        >
          <img src={COMPANY_INFO.logoUrl} alt="Halimbekaul Logo" className="w-24 h-24 object-contain mb-8" />
          <h1 className="text-6xl sm:text-7xl font-black tracking-tighter leading-[0.9] mb-6">
            №1 НА КАВКАЗЕ <br />
            <span className="text-red-600">ПО ПРОИЗВОДСТВУ</span> <br />
            МОРОЖЕНОГО
          </h1>
          <p className="text-xl text-gray-500 max-w-md mb-10 leading-relaxed">
            Мы создаем натуральное мороженое, сохраняя традиции и используя только лучшие ингредиенты нашего региона.
          </p>
          <Link 
            to="/catalog"
            className="group flex items-center gap-4 px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-red-600 transition-all active:scale-95"
          >
            КАТАЛОГ
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50"
        >
          <img 
            src="https://picsum.photos/seed/icecream-hero/1200/1200" 
            alt="Halimbekaul Ice Cream" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>
      </section>

      {/* Info Blocks */}
      <section className="py-20 px-6 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { title: 'Натуральность', desc: 'Свежие ингредиенты' },
              { title: 'Чистота', desc: 'Без консервантов' },
              { title: 'Качество', desc: 'Высокие стандарты' },
              { title: 'Выбор', desc: 'Богатый ассортимент' },
              { title: 'Доступность', desc: 'Приятная цена' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-red-600 font-black text-4xl mb-2">0{i + 1}</div>
                <h4 className="font-bold uppercase tracking-tighter mb-1">{item.title}</h4>
                <p className="text-xs text-gray-400 uppercase tracking-widest">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-black text-white rounded-[3rem] p-12 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-4xl font-black tracking-tighter mb-8 uppercase">ГДЕ МОЖНО КУПИТЬ МОРОЖЕНОЕ?</h2>
            <p className="text-xl text-gray-400 mb-12">
              Мы собрали для вас актуальные адреса магазинов, в которых продается продукция «ХАЛИМБЕКАУЛ».
            </p>
          </div>
          <a 
            href="https://1-1magasine.tilda.ws/halimbekaul-ice" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 text-2xl font-bold hover:text-red-600 transition-colors"
          >
            АДРЕСА МАГАЗИНОВ
            <ArrowRight />
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-red-600 text-white rounded-[3rem] p-12"
        >
          <h2 className="text-4xl font-black tracking-tighter mb-8 uppercase">МЫ ЖДЕМ ВАС!</h2>
          <div className="flex items-start gap-4 mb-12">
            <MapPin className="shrink-0 mt-1" />
            <p className="text-xl font-medium leading-relaxed">
              {COMPANY_INFO.address}
            </p>
          </div>
          <a 
            href={COMPANY_INFO.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-8 py-4 bg-white text-red-600 rounded-full font-bold hover:bg-black hover:text-white transition-all"
          >
            ПРОЛОЖИТЬ МАРШРУТ
          </a>
        </motion.div>
      </section>
    </main>
  );
}
