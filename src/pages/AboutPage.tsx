import React from 'react';
import Layout from '../components/layout/Layout';
import { useTranslation } from 'react-i18next';

const AboutPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <Layout>
      <div className="bg-rose-50 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {isRTL ? 'من نحن' : 'About Us'}
            </h1>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-rose-400 mb-4">
                {isRTL ? 'رؤيتنا' : 'Our Vision'}
              </h3>
              <p className="text-gray-600 mb-4" dir={isRTL ? 'rtl' : 'ltr'}>
                {isRTL 
                  ? 'أن نصبح المنصة الرائدة في اكتشاف وإدارة الفعاليات على مستوى العالم'
                  : 'To become the leading platform for event discovery and management worldwide.'}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-rose-400 mb-4">
                {isRTL ? 'مهمتنا' : 'Our Mission'}
              </h3>
              <p className="text-gray-600 mb-4" dir={isRTL ? 'rtl' : 'ltr'}>
                {isRTL
                  ? 'نسعى جاهدين لربط الناس من خلال الفعاليات الهادفة وخلق تجارب لا تنسى'
                  : 'We strive to connect people through meaningful events and create unforgettable experiences.'}
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-rose-400 mb-4">
                  {isRTL ? 'قيمنا' : 'Our Values'}
                </h3>
                <ul className="space-y-4 text-gray-600" dir={isRTL ? 'rtl' : 'ltr'}>
                  <li>
                    {isRTL ? '✨ الابتكار والإبداع' : '✨ Innovation & Creativity'}
                  </li>
                  <li>
                    {isRTL ? '🤝 التعاون والشراكة' : '🤝 Collaboration & Partnership'}
                  </li>
                  <li>
                    {isRTL ? '💫 التميز في الخدمة' : '💫 Service Excellence'}
                  </li>
                  <li>
                    {isRTL ? '🌟 الشفافية والنزاهة' : '🌟 Transparency & Integrity'}
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-rose-400 mb-4">
                  {isRTL ? 'ما يميزنا' : 'Why Choose Us'}
                </h3>
                <ul className="space-y-4 text-gray-600" dir={isRTL ? 'rtl' : 'ltr'}>
                  <li>
                    {isRTL ? '🎯 خبرة واسعة في مجال الفعاليات' : '🎯 Extensive Event Experience'}
                  </li>
                  <li>
                    {isRTL ? '🚀 منصة سهلة الاستخدام' : '🚀 User-Friendly Platform'}
                  </li>
                  <li>
                    {isRTL ? '💪 دعم فني متواصل' : '💪 Continuous Technical Support'}
                  </li>
                  <li>
                    {isRTL ? '🌐 تغطية عالمية' : '🌐 Global Coverage'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;