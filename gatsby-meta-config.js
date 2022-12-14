module.exports = {
  title: `imhappycoder.com`,
  description: `오늘도 행복한 개발일기`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://www.imhappycoder.com`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `im-happy-coder/im-happy-coder.github.io`, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: 'G-GHFWZZ1GFP', // Google Analytics Tracking ID
  author: {
    name: `장태인`,
    bio: {
      role: `행복한`,
      description: ['매우', '너무', '정말'],
      thumbnail: 'emoji.jpg', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/im-happy-coder`, // `https://github.com/zoomKoding`,
      linkedIn: `https://www.linkedin.com/in/taein-jang-3a03ab20b/`, // `https://www.linkedin.com/in/jinhyeok-jeong-800871192`,
      email: `dev.taein@gmail.com`, // `zoomkoding@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2022.05 ~ 2022.06',
        activity: 'Docker 개발 환경 구성 (toy_project)',
        links: {
          post: '/docker-devland',
          github: 'https://github.com/im-happy-coder/docker-devland',
        },
      },
      {
        date: '2022.04 ~ 2022.05',
        activity: 'VM환경에서 3Tier 구축 하기 (toy_project)',
        links: {
          post: '/vm3tier',
        },
      },
      {
        date: '2021.06 ~ 2022.07',
        activity: '스프링 부트와 AWS로 혼자 구현하는 웹 서비스 (toy_project)',
        links: {
	  github: 'https://github.com/im-happy-coder/springboot-aws-deploy',
        },
      },    
      {
        date: '2021.03',
        activity: 'JSP로 구현한 쇼핑몰 (toy_project)',
        links: {
          github: 'https://github.com/im-happy-coder/jsp-webmarket',
        },
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: 'Docker 개발 환경 구성 (toy_project)',
        description:
          'Docker를 사용하여 어디서든 개발 환경을 구성할 수 있도록 컨테이너화 했습니다. ',
        techStack: ['Docker', 'Container', 'Docker-compose', 'registry'],
        thumbnailUrl: 'docker-devland.jpg',
        links: {
          post: '/docker-devland',
          github: 'https://github.com/im-happy-coder/docker-devland',
        },
      },
      {
        title: 'VM환경에서 3Tier 구축 하기 (toy_project)',
        description:
          'VM환경에서 3Tier Architecture 설계하여 웹서버, WAS, DB 역할을 분리하였고, 가장 기본이 되는 개발 프로세스 구축하였습니다. ',
        techStack: ['Virtualbox', 'CentOS7', 'Apache', 'Tomcat', 'JAVA', 'Jenkins', 'MySQL', 'Maven'],
        thumbnailUrl: 'vm3tier.jpg',
        links: {
          post: '/vm3tier',
        },
      },
      {
        title: '스프링 부트와 AWS로 혼자 구현하는 웹 서비스 (toy_project)',
        description:
          '스프링부트와 AWS Cloud를 이용하여 CI, CD 구현 및 무중단 배포까지 학습하기 위한 프로젝트',
        techStack: ['Spring-boot', 'AWS', 'CI/CD'],
        thumbnailUrl: 'spring-aws.png',
        links: {
	  github: 'https://github.com/im-happy-coder/springboot-aws-deploy',	
        },
      },
      {
        title: 'JSP로 구현한 쇼핑몰 (toy_project)',
        description:
          'JSP를 이용하여 웹사이트의 기본 CRUD 구현하기',
        techStack: ['JAVA', 'JSP'],
        thumbnailUrl: 'jsp-webmarket.gif',
        links: {
          github: 'https://github.com/im-happy-coder/jsp-webmarket',
        },
      },
    ],
  },
};
