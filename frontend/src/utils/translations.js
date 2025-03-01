/**
 * Translation service for GI Software
 *
 * This file provides translations for static UI elements in the React frontend.
 * Place this file in the frontend/src/utils directory.
 */

// Translation strings for UI elements
const translations = {
  // English translations (default)
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    news: 'AI News',
    services: 'Services',
    login: 'Login',

    // Common UI elements
    readMore: 'Read More',
    submit: 'Submit',
    send: 'Send',
    search: 'Search',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    learnMore: 'Learn More',
    exploreServices: 'Explore Services',
    letsTalk: 'Let\'s Talk',

    // Footer
    allRightsReserved: 'All rights reserved',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',

    // Contact form
    name: 'Name',
    email: 'Email',
    message: 'Message',
    phone: 'Phone',
    subject: 'Subject',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    yourMessage: 'Your Message',
    contactUs: 'Contact Us',
    getInTouch: 'Get in Touch',
    messageSent: 'Your message has been sent successfully. We\'ll get back to you shortly.',
    contactIntro: 'We\'d love to hear from you. Fill out the form and our team will get back to you as soon as possible.',
    companyLocation: 'Cluj-Napoca, Romania',
    companyPhoneNumber: '+40 741 038 892',
    companyEmailAddress: 'igioana.ghita@gmail.com',
    contactSendFailed: 'Failed to send message. Try again.',
    contactError: 'An error occurred. Please try again later.',
    send: 'Send Message',

    // Home page
    homeTitle: 'Your Tech Partner for the Future',
    homeTagline: 'Innovative AI-Powered Solutions for Modern Business',
    homeDescription: 'We develop custom software solutions that leverage artificial intelligence, cloud computing, and data analytics to help businesses thrive in an increasingly digital world.',
    homeHighlights: 'Our expertise spans machine learning, web applications, mobile development, and enterprise systems integration across Europe and USA.',

    // About page
    aboutUs: 'About Us',
    ourMission: 'Our Mission',
    ourVision: 'Our Vision',
    ourTeam: 'Our Team',
    ourHistory: 'Our History',
    deliveringInnovativeSolutions: 'Delivering innovative solutions across Europe and the USA',
    missionStatement: 'We are a company focused on leveraging the latest technologies to solve complex challenges and drive growth. Our mission is to empower businesses with cutting-edge software solutions that transform operations and create new opportunities.',
    ourApproach: 'Our Approach',
    approachStatement: 'Our team delivers scalable, high-performance solutions tailored to each client\'s unique needs. We combine technical expertise with industry knowledge to create software that addresses real-world challenges effectively.',
    technologiesWeUse: 'Technologies We Use',

    // Technology items
    aiMl: 'Artificial Intelligence (AI) & Machine Learning (ML)',
    cloudTech: 'Cloud Technologies: AWS, Azure, Google Cloud',
    devOpsTools: 'Automation & DevOps Tools',
    backendDev: 'Backend Development: Node.js, Python, .Net',
    frontendDev: 'Frontend Development: React, Angular, Vue.js',
    databaseTech: 'Database Technologies: PostgreSQL, MongoDB, SQL',
    iotIntegration: 'IoT Integration',

    // Services page
    ourServices: 'Our Services',
    serviceDescription: 'Service Description',
    servicesSubtitle: 'Innovative solutions to transform your business',

    // Service cards
    service_digitalisation: 'Digitalisation',
    service_digitalisation_desc: 'Revolutionize your business with digital transformation. We automate workflows, optimize operations, and integrate the latest technologies for seamless efficiency.',
    service_ai_integrations: 'AI Integrations',
    service_ai_integrations_desc: 'Implement AI-driven solutions that enhance efficiency, automation, and decision-making. From chatbots to predictive analytics, we embed AI into your business.',
    service_admin_systems: 'Admin Systems',
    service_admin_systems_desc: 'Control your platform with robust admin tools. We build user-friendly dashboards that simplify content management, analytics, and security.',
    service_web_applications: 'Web Applications',
    service_web_applications_desc: 'We craft modern, scalable web applications tailored to your needs. From simple websites to complex platforms, we deliver excellence.',
    service_mobile_applications: 'Mobile Applications',
    service_mobile_applications_desc: 'Create intuitive, high-performance mobile apps for iOS and Android platforms that engage users and deliver seamless experiences.',
    service_cloud_solutions: 'Cloud Solutions',
    service_cloud_solutions_desc: 'Leverage the power of cloud technologies for scalable, reliable, and cost-effective infrastructure solutions.',

    // Admin section
    adminPanel: 'Admin Panel',
    dashboard: 'Dashboard',
    manageArticles: 'Manage Articles',
    edit: 'Edit',
    delete: 'Delete',
    logout: 'Logout',
    welcome: 'Welcome',

    // Notifications
    success: 'Success',
    error: 'Error',
    thankYou: 'Thank You',

    // Company specific
    companyName: 'GI Software',
    companyTagline: 'Innovative Solutions for Your Business',

    // Terms and Conditions Page
    termsAndConditions: 'Terms and Conditions',
    lastUpdatedLabel: 'Last Updated',
    lastUpdated: 'March 1, 2025',
    effectiveDate: 'Effective Date:',
    effectiveDateValue: 'January 1, 2025',
    registrationNo: 'Registration No: RO12345678',
    companyAddress: 'Piața Victoriei 1, Bucharest, Romania',
    companyEmail: 'Email:',
    companyPhone: 'Phone:',

    // Terms Sections
    terms_section1: '1. Agreement to Terms',
    terms_section1_text: 'By accessing or using GI Software\'s website, software, or services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access our services.',
    terms_section2: '2. Description of Services',
    terms_section2_text: 'GI Software provides custom software development services including but not limited to AI integration, web applications, mobile development, and cloud solutions. Our services are subject to change without notice.',
    terms_section3: '3. Intellectual Property Rights',
    terms_section3_text: 'All content, features, and functionality on our website and services, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are owned by GI Software and are protected by international copyright, trademark, and other intellectual property laws.',
    terms_section4: '4. User Responsibilities',
    terms_section4_intro: 'When using our services, you agree to:',
    terms_responsibility1: 'Provide accurate and complete information',
    terms_responsibility2: 'Maintain the security of your account',
    terms_responsibility3: 'Not use our services for any illegal or unauthorized purpose',
    terms_responsibility4: 'Not interfere with or disrupt our services or servers',
    terms_responsibility5: 'Comply with all applicable laws and regulations',
    terms_section5: '5. Limitation of Liability',
    terms_section5_text: 'In no event shall GI Software be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.',
    terms_section6: '6. Governing Law',
    terms_section6_text: 'These Terms shall be governed and construed in accordance with the laws of Romania, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.',
    terms_section7: '7. Changes to Terms',
    terms_section7_text: 'We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days\' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.',
    terms_section8: '8. Contact Information',
    terms_contact_intro: 'If you have any questions about these Terms, please contact us at:',

    // Privacy Policy
    privacyPolicy: 'Privacy Policy',
    privacy_section1: '1. Introduction',
    privacy_section1_text1: 'GI Software SRL ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
    privacy_section1_text2: 'Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.',
    privacy_section2: '2. Collection of Your Information',
    privacy_section2_intro: 'We may collect information about you in a variety of ways. The information we may collect via the website includes:',
    privacy_personal_data: 'Personal Data',
    privacy_personal_data_desc: 'Personally identifiable information, such as your name, email address, telephone number, and other information that you voluntarily give to us when you register with the website or when you contact us.',
    privacy_derivative_data: 'Derivative Data',
    privacy_derivative_data_desc: 'Information our servers automatically collect when you access the website, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the website.',
    privacy_financial_data: 'Financial Data',
    privacy_financial_data_desc: 'Financial information, such as data related to your payment method (e.g., bank account details) when you purchase our services. We store only very limited financial information that we need to complete the transaction.',
    privacy_mobile_data: 'Mobile Device Data',
    privacy_mobile_data_desc: 'Device information, such as your mobile device ID, model, and manufacturer, if you access the website from a mobile device.',
    privacy_section3: '3. Use of Your Information',
    privacy_section3_intro: 'Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the website to:',
    privacy_use1: 'Create and manage your account',
    privacy_use2: 'Process payments and refunds',
    privacy_use3: 'Deliver targeted advertising, newsletters, and other information regarding promotions',
    privacy_use4: 'Email you regarding your account or order',
    privacy_use5: 'Fulfill and manage purchases, orders, payments, and other transactions',
    privacy_use6: 'Increase the efficiency and operation of the website',
    privacy_use7: 'Monitor and analyze usage and trends to improve your experience with the website',
    privacy_use8: 'Notify you of updates to the website',
    privacy_use9: 'Prevent fraudulent transactions, monitor against theft, and protect against criminal activity',
    privacy_use10: 'Respond to product and customer service requests',
    privacy_section4: '4. Disclosure of Your Information',
    privacy_section4_intro: 'We may share information we have collected about you in certain situations. Your information may be disclosed as follows:',
    privacy_disclosure1_title: 'By Law or to Protect Rights',
    privacy_disclosure1_desc: 'If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.',
    privacy_disclosure2_title: 'Third-Party Service Providers',
    privacy_disclosure2_desc: 'We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.',
    privacy_disclosure3_title: 'Marketing Communications',
    privacy_disclosure3_desc: 'With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes.',
    privacy_disclosure4_title: 'Business Transfers',
    privacy_disclosure4_desc: 'We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.',
    privacy_section5: '5. Security of Your Information',
    privacy_section5_text: 'We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.',
    privacy_section6: '6. Cookie Policy',
    privacy_section6_text: 'We use cookies and similar tracking technologies to track the activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.',
    privacy_section7: '7. GDPR Rights',
    privacy_section7_intro: 'If you are a resident of the European Union, you have certain data protection rights under the GDPR. We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data. You have the following rights:',
    privacy_gdpr1: 'The right to access, update or delete the information we have on you',
    privacy_gdpr2: 'The right of rectification',
    privacy_gdpr3: 'The right to object',
    privacy_gdpr4: 'The right of restriction',
    privacy_gdpr5: 'The right to data portability',
    privacy_gdpr6: 'The right to withdraw consent',
    privacy_section8: '8. Contact Information',
    privacy_contact_intro: 'If you have questions or comments about this Privacy Policy, please contact us at:',
  },

  // Romanian translations
  ro: {
    // Navigation
    home: 'Acasă',
    about: 'Despre',
    contact: 'Contact',
    news: 'Știri AI',
    services: 'Servicii',
    login: 'Autentificare',

    // Common UI elements
    readMore: 'Citește mai mult',
    submit: 'Trimite',
    send: 'Trimite',
    search: 'Caută',
    back: 'Înapoi',
    next: 'Următorul',
    previous: 'Anterior',
    learnMore: 'Află mai mult',
    exploreServices: 'Explorează serviciile',
    letsTalk: 'Hai să discutăm',

    // Footer
    allRightsReserved: 'Toate drepturile rezervate',
    privacyPolicy: 'Politica de confidențialitate',
    termsOfService: 'Termeni și condiții',

    // Contact form
    name: 'Nume',
    email: 'Email',
    message: 'Mesaj',
    phone: 'Telefon',
    subject: 'Subiect',
    yourName: 'Numele dumneavoastră',
    yourEmail: 'Emailul dumneavoastră',
    yourMessage: 'Mesajul dumneavoastră',
    contactUs: 'Contactați-ne',
    getInTouch: 'Luați legătura cu noi',
    messageSent: 'Mesajul dumneavoastră a fost trimis cu succes. Vă vom contacta în curând.',
    contactIntro: 'Ne-ar plăcea să auzim de la dumneavoastră. Completați formularul și echipa noastră vă va contacta cât mai curând posibil.',
    companyLocation: 'Cluj-Napoca, România',
    companyPhoneNumber: '+40 741 038 892',
    companyEmailAddress: 'igioana.ghita@gmail.com',
    contactSendFailed: 'Trimiterea mesajului a eșuat. Încercați din nou.',
    contactError: 'A apărut o eroare. Vă rugăm să încercați mai târziu.',
    send: 'Trimite mesajul',

    // Home page
    homeTitle: 'Partenerul tău tehnologic pentru viitor',
    homeTagline: 'Soluții inovatoare bazate pe Inteligență Artificială pentru afaceri moderne',
    homeDescription: 'Dezvoltăm soluții software personalizate care utilizează inteligența artificială, cloud computing și analiza datelor pentru a ajuta afacerile să prospere într-o lume din ce în ce mai digitală.',
    homeHighlights: 'Expertiza noastră acoperă domenii precum învățare automată, aplicații web, dezvoltare mobilă și integrare de sisteme de întreprindere în Europa și SUA.',

    // About page
    aboutUs: 'Despre noi',
    ourMission: 'Misiunea noastră',
    ourVision: 'Viziunea noastră',
    ourTeam: 'Echipa noastră',
    ourHistory: 'Istoria noastră',
    deliveringInnovativeSolutions: 'Oferim soluții inovatoare în Europa și SUA',
    missionStatement: 'Suntem o companie concentrată pe utilizarea celor mai noi tehnologii pentru a rezolva provocări complexe și a stimula creșterea. Misiunea noastră este de a oferi afacerilor soluții software de ultimă generație care transformă operațiunile și creează noi oportunități.',
    ourApproach: 'Abordarea noastră',
    approachStatement: 'Echipa noastră oferă soluții scalabile și de înaltă performanță adaptate nevoilor unice ale fiecărui client. Combinăm expertiza tehnică cu cunoștințele din industrie pentru a crea software care abordează eficient provocările din lumea reală.',
    technologiesWeUse: 'Tehnologiile pe care le folosim',

    // Technology items
    aiMl: 'Inteligență Artificială (AI) și Machine Learning (ML)',
    cloudTech: 'Tehnologii Cloud: AWS, Azure, Google Cloud',
    devOpsTools: 'Automatizare și instrumente DevOps',
    backendDev: 'Dezvoltare Backend: Node.js, Python, .Net',
    frontendDev: 'Dezvoltare Frontend: React, Angular, Vue.js',
    databaseTech: 'Tehnologii de baze de date: PostgreSQL, MongoDB, SQL',
    iotIntegration: 'Integrare IoT',

    // Services page
    ourServices: 'Serviciile noastre',
    serviceDescription: 'Descrierea serviciului',
    servicesSubtitle: 'Soluții inovatoare pentru transformarea afacerii dvs.',

    // Service cards
    service_digitalisation: 'Digitalizare',
    service_digitalisation_desc: 'Revoluționați-vă afacerea prin transformare digitală. Automatizăm fluxurile de lucru, optimizăm operațiunile și integrăm cele mai noi tehnologii pentru eficiență perfectă.',
    service_ai_integrations: 'Integrări AI',
    service_ai_integrations_desc: 'Implementăm soluții bazate pe AI care îmbunătățesc eficiența, automatizarea și luarea deciziilor. De la chatboți la analize predictive, integrăm AI în afacerea dvs.',
    service_admin_systems: 'Sisteme Administrative',
    service_admin_systems_desc: 'Controlați-vă platforma cu instrumente administrative robuste. Construim tablouri de bord ușor de utilizat care simplifică gestionarea conținutului, analitica și securitatea.',
    service_web_applications: 'Aplicații Web',
    service_web_applications_desc: 'Creăm aplicații web moderne și scalabile adaptate nevoilor dumneavoastră. De la site-uri simple la platforme complexe, livrăm excelență.',
    service_mobile_applications: 'Aplicații Mobile',
    service_mobile_applications_desc: 'Creați aplicații mobile intuitive și de înaltă performanță pentru platformele iOS și Android care implică utilizatorii și oferă experiențe perfecte.',
    service_cloud_solutions: 'Soluții Cloud',
    service_cloud_solutions_desc: 'Valorificați puterea tehnologiilor cloud pentru soluții de infrastructură scalabile, fiabile și rentabile.',

    // Admin section
    adminPanel: 'Panou de administrare',
    dashboard: 'Tablou de bord',
    manageArticles: 'Gestionare articole',
    edit: 'Editează',
    delete: 'Șterge',
    logout: 'Deconectare',
    welcome: 'Bun venit',

    // Notifications
    success: 'Succes',
    error: 'Eroare',
    thankYou: 'Mulțumim',

    // Company specific
    companyName: 'GI Software',
    companyTagline: 'Soluții Inovatoare pentru Afacerea Ta',

    // Terms and Conditions Page
    termsAndConditions: 'Termeni și Condiții',
    lastUpdatedLabel: 'Ultima actualizare',
    lastUpdated: '1 Martie 2025',
    effectiveDate: 'Data intrării în vigoare:',
    effectiveDateValue: '1 Ianuarie 2025',
    registrationNo: 'Nr. Înregistrare: RO12345678',
    companyAddress: 'Piața Victoriei 1, București, România',
    companyEmail: 'Email:',
    companyPhone: 'Telefon:',

    // Terms Sections
    terms_section1: '1. Acceptarea Termenilor',
    terms_section1_text: 'Prin accesarea sau utilizarea site-ului web, software-ului sau serviciilor GI Software, sunteți de acord să respectați acești Termeni și Condiții. Dacă nu sunteți de acord cu orice parte a termenilor, nu puteți accesa serviciile noastre.',
    terms_section2: '2. Descrierea Serviciilor',
    terms_section2_text: 'GI Software oferă servicii personalizate de dezvoltare software, inclusiv, dar fără a se limita la integrarea AI, aplicații web, dezvoltare mobilă și soluții cloud. Serviciile noastre pot fi modificate fără notificare prealabilă.',
    terms_section3: '3. Drepturi de Proprietate Intelectuală',
    terms_section3_text: 'Tot conținutul, funcționalitățile și funcțiile de pe site-ul nostru web și serviciile noastre, inclusiv, dar fără a se limita la text, grafică, logo-uri, pictograme, imagini, clipuri audio și software, sunt deținute de GI Software și sunt protejate de legile internaționale privind drepturile de autor, mărcile comerciale și alte legi de proprietate intelectuală.',
    terms_section4: '4. Responsabilitățile Utilizatorului',
    terms_section4_intro: 'Când utilizați serviciile noastre, sunteți de acord să:',
    terms_responsibility1: 'Furnizați informații exacte și complete',
    terms_responsibility2: 'Mențineți securitatea contului dvs.',
    terms_responsibility3: 'Nu utilizați serviciile noastre în scopuri ilegale sau neautorizate',
    terms_responsibility4: 'Nu interferați cu sau să întrerupeți serviciile sau serverele noastre',
    terms_responsibility5: 'Respectați toate legile și reglementările aplicabile',
    terms_section5: '5. Limitarea Răspunderii',
    terms_section5_text: 'În niciun caz GI Software nu va fi răspunzător pentru daune indirecte, incidentale, speciale, consecutive sau punitive, inclusiv, fără limitare, pierderea de profit, date, utilizare, fond comercial sau alte pierderi intangibile, rezultate din accesul sau utilizarea sau incapacitatea de a accesa sau utiliza serviciile.',
    terms_section6: '6. Legislația Aplicabilă',
    terms_section6_text: 'Acești Termeni vor fi guvernați și interpretați în conformitate cu legile din România, fără a ține cont de dispozițiile sale privind conflictul de legi. Neaplicarea din partea noastră a oricărui drept sau prevedere a acestor Termeni nu va fi considerată o renunțare la aceste drepturi.',
    terms_section7: '7. Modificări ale Termenilor',
    terms_section7_text: 'Ne rezervăm dreptul de a modifica sau înlocui acești Termeni în orice moment. Dacă o revizuire este materială, vom oferi o notificare cu cel puțin 30 de zile înainte de intrarea în vigoare a noilor termeni. Ce constituie o modificare materială va fi determinat la discreția noastră exclusivă.',
    terms_section8: '8. Informații de Contact',
    terms_contact_intro: 'Dacă aveți întrebări despre acești Termeni, vă rugăm să ne contactați la:',

    // Privacy Policy
    privacyPolicy: 'Politica de Confidențialitate',
    privacy_section1: '1. Introducere',
    privacy_section1_text1: 'GI Software SRL ("noi", "nostru" sau "noastră") se angajează să vă protejeze confidențialitatea. Această Politică de Confidențialitate explică modul în care colectăm, folosim, dezvăluim și protejăm informațiile dvs. atunci când vizitați site-ul nostru web sau utilizați serviciile noastre.',
    privacy_section1_text2: 'Vă rugăm să citiți cu atenție această politică de confidențialitate. Dacă nu sunteți de acord cu termenii acestei politici de confidențialitate, vă rugăm să nu accesați site-ul.',
    privacy_section2: '2. Colectarea Informațiilor Dvs.',
    privacy_section2_intro: 'Putem colecta informații despre dvs. în diverse moduri. Informațiile pe care le putem colecta prin intermediul site-ului web includ:',
    privacy_personal_data: 'Date Personale',
    privacy_personal_data_desc: 'Informații de identificare personală, cum ar fi numele, adresa de email, numărul de telefon și alte informații pe care ni le furnizați voluntar atunci când vă înregistrați pe site-ul web sau când ne contactați.',
    privacy_derivative_data: 'Date Derivate',
    privacy_derivative_data_desc: 'Informații pe care serverele noastre le colectează automat atunci când accesați site-ul web, cum ar fi adresa IP, tipul de browser, sistemul de operare, orele de acces și paginile pe care le-ați vizualizat direct înainte și după accesarea site-ului web.',
    privacy_financial_data: 'Date Financiare',
    privacy_financial_data_desc: 'Informații financiare, cum ar fi datele legate de metoda dvs. de plată (de exemplu, detaliile contului bancar) atunci când achiziționați serviciile noastre. Stocăm doar informații financiare foarte limitate de care avem nevoie pentru a finaliza tranzacția.',
    privacy_mobile_data: 'Date Dispozitiv Mobil',
    privacy_mobile_data_desc: 'Informații despre dispozitiv, cum ar fi ID-ul dispozitivului mobil, modelul și producătorul, dacă accesați site-ul web de pe un dispozitiv mobil.',
    privacy_section3: '3. Utilizarea Informațiilor Dvs.',
    privacy_section3_intro: 'Având informații precise despre dvs. ne permite să vă oferim o experiență fluidă, eficientă și personalizată. În mod specific, putem utiliza informațiile colectate despre dvs. prin intermediul site-ului web pentru a:',
    privacy_use1: 'Crea și gestiona contul dvs.',
    privacy_use2: 'Procesa plăți și rambursări',
    privacy_use3: 'Livra publicitate țintită, buletine informative și alte informații privind promoțiile',
    privacy_use4: 'Vă trimite email-uri privind contul sau comanda dvs.',
    privacy_use5: 'Îndeplini și gestiona achiziții, comenzi, plăți și alte tranzacții',
    privacy_use6: 'Crește eficiența și operațiunea site-ului web',
    privacy_use7: 'Monitoriza și analiza utilizarea și tendințele pentru a îmbunătăți experiența dvs. cu site-ul web',
    privacy_use8: 'Vă notifica despre actualizările site-ului web',
    privacy_use9: 'Preveni tranzacțiile frauduloase, monitorizarea împotriva furtului și protejarea împotriva activităților criminale',
    privacy_use10: 'Răspunde la solicitările de produse și servicii pentru clienți',
    privacy_section4: '4. Dezvăluirea Informațiilor Dvs.',
    privacy_section4_intro: 'Putem împărtăși informații pe care le-am colectat despre dvs. în anumite situații. Informațiile dvs. pot fi dezvăluite după cum urmează:',
    privacy_disclosure1_title: 'Prin Lege sau pentru Protejarea Drepturilor',
    privacy_disclosure1_desc: 'Dacă credem că divulgarea informațiilor despre dvs. este necesară pentru a răspunde unui proces legal, pentru a investiga sau remedia potențiale încălcări ale politicilor noastre sau pentru a proteja drepturile, proprietatea și siguranța altora, putem împărtăși informațiile dvs. conform oricărei legi, reguli sau reglementări aplicabile.',
    privacy_disclosure2_title: 'Furnizori de Servicii Terți',
    privacy_disclosure2_desc: 'Putem împărtăși informațiile dvs. cu terțe părți care prestează servicii pentru noi sau în numele nostru, inclusiv procesarea plăților, analiza datelor, livrarea de email-uri, servicii de hosting, servicii pentru clienți și asistență pentru marketing.',
    privacy_disclosure3_title: 'Comunicări de Marketing',
    privacy_disclosure3_desc: 'Cu consimțământul dvs., sau cu o oportunitate pentru dvs. de a vă retrage consimțământul, putem împărtăși informațiile dvs. cu terțe părți în scopuri de marketing.',
    privacy_disclosure4_title: 'Transferuri de Afaceri',
    privacy_disclosure4_desc: 'Putem împărtăși sau transfera informațiile dvs. în legătură cu, sau în timpul negocierilor de, orice fuziune, vânzare de active ale companiei, finanțare sau achiziție a întregii sau a unei părți din afacerea noastră către o altă companie.',
    privacy_section5: '5. Securitatea Informațiilor Dvs.',
    privacy_section5_text: 'Utilizăm măsuri administrative, tehnice și fizice de securitate pentru a ajuta la protejarea informațiilor dvs. personale. În timp ce am luat măsuri rezonabile pentru a securiza informațiile personale pe care ni le furnizați, vă rugăm să fiți conștienți că, în ciuda eforturilor noastre, nicio măsură de securitate nu este perfectă sau impenetrabilă, și nicio metodă de transmitere a datelor nu poate fi garantată împotriva oricărei interceptări sau alt tip de utilizare greșită.',
    privacy_section6: '6. Politica de Cookie-uri',
    privacy_section6_text: 'Utilizăm cookie-uri și tehnologii similare de urmărire pentru a monitoriza activitatea pe site-ul nostru web și pentru a reține anumite informații. Cookie-urile sunt fișiere cu o cantitate mică de date care pot include un identificator unic anonim. Puteți instrui browserul dvs. să refuze toate cookie-urile sau să indice când un cookie este trimis.',
    privacy_section7: '7. Drepturi GDPR',
    privacy_section7_intro: 'Dacă sunteți rezident al Uniunii Europene, aveți anumite drepturi de protecție a datelor în conformitate cu GDPR. Ne propunem să luăm măsuri rezonabile pentru a vă permite să corectați, modificați, ștergeți sau limitați utilizarea Datelor dvs. Personale. Aveți următoarele drepturi:',
    privacy_gdpr1: 'Dreptul de a accesa, actualiza sau șterge informațiile pe care le avem despre dvs.',
    privacy_gdpr2: 'Dreptul de rectificare',
    privacy_gdpr3: 'Dreptul de a obiecta',
    privacy_gdpr4: 'Dreptul de restricție',
    privacy_gdpr5: 'Dreptul la portabilitatea datelor',
    privacy_gdpr6: 'Dreptul de a retrage consimțământul',
    privacy_section8: '8. Informații de Contact',
    privacy_contact_intro: 'Dacă aveți întrebări sau comentarii despre această Politică de Confidențialitate, vă rugăm să ne contactați la:',
  }
};

// Translation hook for use in components
export function useTranslation() {
  // Get language from localStorage or default to English
  const getLanguage = () => localStorage.getItem('language') || 'en';

  // Translate function that handles both single key and key with default value
  const t = (key, defaultValue) => {
    const language = getLanguage();

    // Return translation or fallback to English, default value, or the key itself
    return translations[language]?.[key] ||
           translations.en?.[key] ||
           defaultValue ||
           key;
  };

  return { t, language: getLanguage() };
}

export default translations;