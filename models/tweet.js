// Mock database
const tweets = [
  {
    id: 1,
    text: "🎯 Introducing SCI16Z AI Research Assistant - A revolutionary system that analyzes scientific papers in real-time, helping researchers find breakthroughs faster. #AI #Science #Research",
    likes: 87,
    views: 4321,
    created_at: "2025-02-10",
    authorReplies: [
      {
        text: "The system currently supports papers from over 100 scientific disciplines in multiple languages",
        created_at: "2025-02-10"
      },
      {
        text: "Our goal is to help every researcher stand on the shoulders of giants and see further",
        created_at: "2025-02-10"
      }
    ]
  },
  {
    id: 2,
    text: "💡 Major breakthrough: Our quantum computing simulator successfully simulated a 50-qubit system! This will help researchers develop and test quantum algorithms on classical computers. #QuantumComputing #Tech",
    likes: 92,
    views: 3876,
    created_at: "2025-02-08",
    authorReplies: [
      {
        text: "This breakthrough means we can develop and validate quantum algorithms without needing actual quantum hardware",
        created_at: "2025-02-08"
      },
      {
        text: "The simulator code will be open-sourced next week. Community contributions welcome!",
        created_at: "2025-02-08"
      }
    ]
  },
  {
    id: 3,
    text: "🧬 Bioinformatics breakthrough: Our AI system successfully predicted a novel protein folding structure with implications for drug development! Paper submitted to Nature. #BioTech #AI #Science",
    likes: 76,
    views: 2987,
    created_at: "2025-02-05",
    authorReplies: [
      {
        text: "This prediction method is 100x faster than traditional experimental methods with 95% accuracy",
        created_at: "2025-02-05"
      },
      {
        text: "Complete research dataset will be published after paper acceptance",
        created_at: "2025-02-05"
      }
    ]
  },
  {
    id: 4,
    text: "🚀 Exciting news: SCI16Z partners with SpaceX! Our quantum communication experiment will launch on Starlink satellites this year! #Space #QuantumTech #Innovation",
    likes: 95,
    views: 4567,
    created_at: "2025-02-02",
    authorReplies: [
      {
        text: "This will be the first quantum entanglement experiment in low Earth orbit",
        created_at: "2025-02-02"
      },
      {
        text: "Success will lay the foundation for future quantum internet",
        created_at: "2025-02-02"
      }
    ]
  },
  {
    id: 5,
    text: "🤖 Major paper accepted: 'Cross-Modal Scientific Literature Understanding with Hybrid Neural Networks' accepted by Science! A milestone in AI understanding of scientific literature. #AI #Science #Research",
    likes: 83,
    views: 3456,
    created_at: "2025-01-30",
    authorReplies: [
      {
        text: "The paper demonstrates how AI can simultaneously understand text, figures, and mathematical equations",
        created_at: "2025-01-30"
      },
      {
        text: "Our model outperformed human experts in scientific literature comprehension tests",
        created_at: "2025-01-30"
      }
    ]
  },
  {
    id: 6,
    text: "⚡ Energy tech breakthrough: Our quantum dot solar cells achieve 30% efficiency! This will revolutionize clean energy. #CleanTech #Innovation #Sustainability",
    likes: 71,
    views: 2345,
    created_at: "2025-01-25",
    authorReplies: [
      {
        text: "These new solar cells maintain high efficiency even in low-light conditions",
        created_at: "2025-01-25"
      },
      {
        text: "Commercial production expected to begin in 2025",
        created_at: "2025-01-25"
      }
    ]
  },
  {
    id: 7,
    text: "🧠 Breaking: Our brain-computer interface breaks information transfer speed records! First direct thought-to-text input achieved. #BCI #Neuroscience #Future",
    likes: 89,
    views: 4123,
    created_at: "2025-01-20",
    authorReplies: [
      {
        text: "This technology will help paralyzed patients regain their ability to communicate",
        created_at: "2025-01-20"
      },
      {
        text: "Clinical trials show users can type at 60 words per minute using thought alone",
        created_at: "2025-01-20"
      }
    ]
  },
  {
    id: 8,
    text: "📊 Launching SCI16Z Graph - Our new open-source tool for visualizing research collaboration networks. Find potential collaborators easily! #OpenScience #Research",
    likes: 67,
    views: 1987,
    created_at: "2025-01-18",
    authorReplies: [
      {
        text: "Tool is now open-sourced on GitHub. Contributions welcome!",
        created_at: "2025-01-18"
      },
      {
        text: "Join our online workshop next Tuesday to learn how to use the tool",
        created_at: "2025-01-18"
      }
    ]
  },
  {
    id: 9,
    text: "🌍 Climate tech progress: Our AI model successfully predicts local climate changes with 93% accuracy! This will help create more precise environmental policies. #ClimateChange #AI",
    likes: 85,
    views: 3789,
    created_at: "2025-01-15",
    authorReplies: [
      {
        text: "The model considers over 1000 environmental variables, making it the most complex climate prediction system to date",
        created_at: "2025-01-15"
      },
      {
        text: "Several countries' environmental agencies have already started using our prediction system",
        created_at: "2025-01-15"
      }
    ]
  },
  {
    id: 10,
    text: "💊 Medical AI breakthrough: Our AI system wins first place in molecular design competition! Successfully designed potential drugs for new viruses. #Medicine #AI #Innovation",
    likes: 93,
    views: 4567,
    created_at: "2025-01-12",
    authorReplies: [
      {
        text: "AI-designed molecules have entered pre-clinical trials",
        created_at: "2025-01-12"
      },
      {
        text: "This system reduces drug development time by 60% on average",
        created_at: "2025-01-12"
      }
    ]
  }
];

class Tweet {
  static getAll() {
    return tweets;
  }

  static getById(id) {
    const tweet = tweets.find(t => t.id === id);
    if (!tweet) return null;

    // 根据文章内容生成相关资源
    tweet.resources = generateRelatedResources(tweet.text);
    return tweet;
  }
}

// 生成相关资源的辅助函数
function generateRelatedResources(text) {
  // 提取文章中的关键词
  const keywords = text
    .match(/#[\w\u4e00-\u9fa5]+/g)
    ?.map(tag => tag.slice(1))
    .filter(Boolean) || [];

  // 预定义一些论文模板
  const paperTemplates = [
    {
      title: "A Survey of Knowledge Base Construction Techniques",
      url: "https://arxiv.org/pdf/2502.04654v1",
      description: "A comprehensive review of various techniques and recent advances in knowledge base construction"
    },
    {
      title: "Efficient Methods for Large-Scale Knowledge Graph Generation",
      url: "https://arxiv.org/pdf/2501.08932v1",
      description: "Exploring efficient methods for generating large-scale knowledge graphs"
    },
    {
      title: "Neural Approaches to Knowledge Base Population",
      url: "https://arxiv.org/pdf/2412.09765v2", 
      description: "Using neural network methods for knowledge base population"
    },
    {
      title: "Automated Knowledge Extraction from Scientific Literature",
      url: "https://www.biorxiv.org/content/10.1101/2025.01.15.575640v1",
      description: "Methods for automatically extracting knowledge from scientific literature"
    },
    {
      title: "Knowledge Base Question Answering: A Comprehensive Review",
      url: "https://www.medrxiv.org/content/10.1101/2025.02.01.24302075v1",
      description: "A comprehensive review of knowledge base question answering systems"
    }
  ];

  // 随机选择2-4篇相关论文
  const count = Math.floor(Math.random() * 3) + 2;
  const resources = [];
  
  for (let i = 0; i < count; i++) {
    const template = paperTemplates[Math.floor(Math.random() * paperTemplates.length)];
    if (!resources.find(r => r.url === template.url)) {
      resources.push({
        title: template.title,
        url: template.url,
        description: template.description
      });
    }
  }

  return resources;
}

module.exports = Tweet; 