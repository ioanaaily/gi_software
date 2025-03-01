import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/TranslationProvider";
import "../styles/services.css";

function Services() {
  const { t } = useTranslation();

  return (
    <div className="services-container">
      <div className="services-header">
        <h1 className="services-title">{t('ourServices')}</h1>
        <p className="services-subtitle">{t('servicesSubtitle', 'Innovative solutions to transform your business')}</p>
      </div>

      <div className="services-grid">
        <ServiceCard
          title="Digitalisation"
          description="Revolutionize your business with digital transformation. We automate workflows, optimize operations, and integrate the latest technologies for seamless efficiency."
          features={[
            "Custom workflow automation",
            "Process optimization",
            "Integration with existing systems",
            "Digital document management"
          ]}
          link="/digitalisation"
        />

        <ServiceCard
          title="AI Integrations"
          description="Implement AI-driven solutions that enhance efficiency, automation, and decision-making. From chatbots to predictive analytics, we embed AI into your business."
          features={[
            "Machine learning integration",
            "Natural language processing",
            "Predictive analytics",
            "Computer vision solutions"
          ]}
          link="/ai-integrations"
        />

        <ServiceCard
          title="Admin Systems"
          description="Control your platform with robust admin tools. We build user-friendly dashboards that simplify content management, analytics, and security."
          features={[
            "Custom admin dashboards",
            "User management systems",
            "Content management",
            "Analytics and reporting"
          ]}
          link="/admin-systems"
        />

        <ServiceCard
          title="Web Applications"
          description="We craft modern, scalable web applications tailored to your needs. From simple websites to complex platforms, we deliver excellence."
          features={[
            "Responsive design",
            "Cross-browser compatibility",
            "Progressive web apps",
            "API development and integration"
          ]}
          link="/web-applications"
        />

        <ServiceCard
          title="Mobile Applications"
          description="Create intuitive, high-performance mobile apps for iOS and Android platforms that engage users and deliver seamless experiences."
          features={[
            "Native iOS development",
            "Native Android development",
            "Cross-platform solutions",
            "Mobile app maintenance"
          ]}
          link="/mobile-applications"
        />

        <ServiceCard
          title="Cloud Solutions"
          description="Leverage the power of cloud technologies for scalable, reliable, and cost-effective infrastructure solutions."
          features={[
            "Cloud migration",
            "Infrastructure as code",
            "Serverless architectures",
            "DevOps automation"
          ]}
          link="/cloud-solutions"
        />
      </div>
    </div>
  );
}

const ServiceCard = ({ title, description, features, link }) => {
  const { t } = useTranslation();

  return (
    <div className="service-card">
      <div className="service-icon">💡</div>
      <h2 className="service-name">{t(`service_${title.toLowerCase().replace(/\s+/g, '_')}`, title)}</h2>
      <p className="service-description">{t(`service_${title.toLowerCase().replace(/\s+/g, '_')}_desc`, description)}</p>

      <ul className="service-features">
        {features.map((feature, index) => (
          <li key={index}>{t(`feature_${feature.toLowerCase().replace(/\s+/g, '_')}`, feature)}</li>
        ))}
      </ul>

      {/* <div className="service-cta">
        <Link to={link} className="service-button">{t('learnMore', 'Learn More')}</Link>
      </div> */}
    </div>
  );
};

export default Services;
