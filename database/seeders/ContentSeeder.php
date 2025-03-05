<?php

namespace Database\Seeders;

use App\Models\Content;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();
        $users = User::all();

        if ($users->isEmpty()) {
            $this->command->error('No users found. Please run UserSeeder first.');
            return;
        }

        // Clear existing content and related data
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        Content::truncate();
        DB::table('content_categories')->truncate();
        DB::table('content_versions')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        $contentTypes = ['article', 'news', 'event', 'page'];
        $languages = ['en', 'ar'];

        $contents = [
            [
                'title' => 'Welcome to Our Platform',
                'title_ar' => 'مرحباً بكم في منصتنا',
                'content_body' => 'Welcome to our comprehensive platform. We are dedicated to providing the best experience for our users.',
                'content_body_ar' => 'مرحباً بكم في منصتنا الشاملة. نحن ملتزمون بتقديم أفضل تجربة لمستخدمينا.',
                'content_type' => 'page',
                'is_published' => true,
                'meta_description' => 'Welcome page of our platform',
                'meta_description_ar' => 'صفحة الترحيب في منصتنا',
                'keywords' => 'welcome, platform, introduction',
                'keywords_ar' => 'ترحيب، منصة، مقدمة',
                'featured_image' => 'welcome-image.jpg',
                'language_code' => 'en',
                'categories' => ['About Us']
            ],
            [
                'title' => 'Latest Technology Trends',
                'title_ar' => 'أحدث اتجاهات التكنولوجيا',
                'content_body' => 'Explore the latest trends in technology and innovation that are shaping our future.',
                'content_body_ar' => 'اكتشف أحدث اتجاهات التكنولوجيا والابتكار التي تشكل مستقبلنا.',
                'content_type' => 'article',
                'is_published' => true,
                'meta_description' => 'Latest technology trends and innovations',
                'meta_description_ar' => 'أحدث اتجاهات التكنولوجيا والابتكارات',
                'keywords' => 'technology, trends, innovation',
                'keywords_ar' => 'تكنولوجيا، اتجاهات، ابتكار',
                'featured_image' => 'tech-trends.jpg',
                'language_code' => 'en',
                'categories' => ['News']
            ],
            [
                'title' => 'Annual Conference 2024',
                'title_ar' => 'المؤتمر السنوي 2024',
                'content_body' => 'Join us for our annual conference where industry experts will share their insights.',
                'content_body_ar' => 'انضم إلينا في مؤتمرنا السنوي حيث يشارك خبراء الصناعة رؤاهم.',
                'content_type' => 'event',
                'is_published' => true,
                'meta_description' => 'Annual conference event details',
                'meta_description_ar' => 'تفاصيل المؤتمر السنوي',
                'keywords' => 'conference, annual, event',
                'keywords_ar' => 'مؤتمر، سنوي، فعالية',
                'featured_image' => 'conference-2024.jpg',
                'language_code' => 'en',
                'categories' => ['Events']
            ],
            [
                'title' => 'Our Services Overview',
                'title_ar' => 'نظرة عامة على خدماتنا',
                'content_body' => 'Discover our comprehensive range of services designed to meet your needs.',
                'content_body_ar' => 'اكتشف مجموعتنا الشاملة من الخدمات المصممة لتلبية احتياجاتك.',
                'content_type' => 'page',
                'is_published' => true,
                'meta_description' => 'Overview of our services',
                'meta_description_ar' => 'نظرة عامة على خدماتنا',
                'keywords' => 'services, overview, solutions',
                'keywords_ar' => 'خدمات، نظرة عامة، حلول',
                'featured_image' => 'services-overview.jpg',
                'language_code' => 'en',
                'categories' => ['Services']
            ],
            [
                'title' => 'Artificial Intelligence in Healthcare',
                'title_ar' => 'الذكاء الاصطناعي في الرعاية الصحية',
                'content_body' => 'Discover how AI is revolutionizing healthcare delivery and patient care.',
                'content_body_ar' => 'اكتشف كيف يحدث الذكاء الاصطناعي ثورة في تقديم الرعاية الصحية ورعاية المرضى.',
                'content_type' => 'article',
                'is_published' => true,
                'meta_description' => 'AI applications in healthcare',
                'meta_description_ar' => 'تطبيقات الذكاء الاصطناعي في الرعاية الصحية',
                'keywords' => 'AI, healthcare, technology',
                'keywords_ar' => 'ذكاء اصطناعي، رعاية صحية، تكنولوجيا',
                'featured_image' => 'ai-healthcare.jpg',
                'language_code' => 'en',
                'categories' => ['Technology', 'Healthcare']
            ],
            [
                'title' => 'Web Development Workshop',
                'title_ar' => 'ورشة تطوير الويب',
                'content_body' => 'Join our intensive web development workshop to learn modern development practices.',
                'content_body_ar' => 'انضم إلى ورشة تطوير الويب المكثفة لتعلم ممارسات التطوير الحديثة.',
                'content_type' => 'event',
                'is_published' => true,
                'meta_description' => 'Web development workshop details',
                'meta_description_ar' => 'تفاصيل ورشة تطوير الويب',
                'keywords' => 'web development, workshop, training',
                'keywords_ar' => 'تطوير الويب، ورشة عمل، تدريب',
                'featured_image' => 'web-dev-workshop.jpg',
                'language_code' => 'en',
                'categories' => ['Events', 'Technology']
            ],
            [
                'title' => 'Cybersecurity Best Practices',
                'title_ar' => 'أفضل ممارسات الأمن السيبراني',
                'content_body' => 'Learn essential cybersecurity practices to protect your digital assets.',
                'content_body_ar' => 'تعلم ممارسات الأمن السيبراني الأساسية لحماية أصولك الرقمية.',
                'content_type' => 'article',
                'is_published' => true,
                'meta_description' => 'Cybersecurity guidelines and best practices',
                'meta_description_ar' => 'إرشادات وممارسات الأمن السيبراني',
                'keywords' => 'cybersecurity, security, protection',
                'keywords_ar' => 'أمن سيبراني، أمان، حماية',
                'featured_image' => 'cybersecurity.jpg',
                'language_code' => 'en',
                'categories' => ['Technology', 'Security']
            ],
            [
                'title' => 'Contact Us',
                'title_ar' => 'اتصل بنا',
                'content_body' => 'Get in touch with our team for any inquiries or support.',
                'content_body_ar' => 'تواصل مع فريقنا لأي استفسارات أو دعم.',
                'content_type' => 'page',
                'is_published' => true,
                'meta_description' => 'Contact information and support',
                'meta_description_ar' => 'معلومات الاتصال والدعم',
                'keywords' => 'contact, support, help',
                'keywords_ar' => 'اتصال، دعم، مساعدة',
                'featured_image' => 'contact-us.jpg',
                'language_code' => 'en',
                'categories' => ['Contact']
            ],
            [
                'title' => 'Cloud Computing Trends 2024',
                'title_ar' => 'اتجاهات الحوسبة السحابية 2024',
                'content_body' => 'Explore the latest trends in cloud computing and their impact on businesses.',
                'content_body_ar' => 'اكتشف أحدث اتجاهات الحوسبة السحابية وتأثيرها على الأعمال.',
                'content_type' => 'article',
                'is_published' => true,
                'meta_description' => 'Cloud computing trends and insights',
                'meta_description_ar' => 'اتجاهات ورؤى الحوسبة السحابية',
                'keywords' => 'cloud, computing, trends',
                'keywords_ar' => 'سحابة، حوسبة، اتجاهات',
                'featured_image' => 'cloud-computing.jpg',
                'language_code' => 'en',
                'categories' => ['Technology']
            ],
            [
                'title' => 'Mobile App Development Summit',
                'title_ar' => 'قمة تطوير تطبيقات الموبايل',
                'content_body' => 'Join industry experts at our annual mobile app development summit.',
                'content_body_ar' => 'انضم إلى خبراء الصناعة في قمة تطوير تطبيقات الموبايل السنوية.',
                'content_type' => 'event',
                'is_published' => true,
                'meta_description' => 'Mobile app development summit details',
                'meta_description_ar' => 'تفاصيل قمة تطوير تطبيقات الموبايل',
                'keywords' => 'mobile, apps, summit',
                'keywords_ar' => 'موبايل، تطبيقات، قمة',
                'featured_image' => 'mobile-summit.jpg',
                'language_code' => 'en',
                'categories' => ['Events', 'Technology']
            ],
            [
                'title' => 'Data Privacy Guidelines',
                'title_ar' => 'إرشادات خصوصية البيانات',
                'content_body' => 'Understanding data privacy regulations and best practices for compliance.',
                'content_body_ar' => 'فهم لوائح خصوصية البيانات وأفضل ممارسات الامتثال.',
                'content_type' => 'article',
                'is_published' => true,
                'meta_description' => 'Data privacy guidelines and compliance',
                'meta_description_ar' => 'إرشادات خصوصية البيانات والامتثال',
                'keywords' => 'privacy, data, compliance',
                'keywords_ar' => 'خصوصية، بيانات، امتثال',
                'featured_image' => 'data-privacy.jpg',
                'language_code' => 'en',
                'categories' => ['Security', 'Compliance']
            ],
            [
                'title' => 'About Our Team',
                'title_ar' => 'عن فريقنا',
                'content_body' => 'Meet the talented individuals behind our success.',
                'content_body_ar' => 'تعرف على الأفراد الموهوبين وراء نجاحنا.',
                'content_type' => 'page',
                'is_published' => true,
                'meta_description' => 'Our team members and their roles',
                'meta_description_ar' => 'أعضاء فريقنا وأدوارهم',
                'keywords' => 'team, about, company',
                'keywords_ar' => 'فريق، عن، شركة',
                'featured_image' => 'our-team.jpg',
                'language_code' => 'en',
                'categories' => ['About Us']
            ],
            [
                'title' => 'Blockchain Technology Overview',
                'title_ar' => 'نظرة عامة على تقنية البلوكتشين',
                'content_body' => 'Understanding the fundamentals of blockchain technology and its applications.',
                'content_body_ar' => 'فهم أساسيات تقنية البلوكتشين وتطبيقاتها.',
                'content_type' => 'article',
                'is_published' => true,
                'meta_description' => 'Blockchain technology basics and applications',
                'meta_description_ar' => 'أساسيات وتطبيقات تقنية البلوكتشين',
                'keywords' => 'blockchain, technology, crypto',
                'keywords_ar' => 'بلوكتشين، تكنولوجيا، كريبتو',
                'featured_image' => 'blockchain.jpg',
                'language_code' => 'en',
                'categories' => ['Technology']
            ],
            [
                'title' => 'Digital Marketing Workshop',
                'title_ar' => 'ورشة التسويق الرقمي',
                'content_body' => 'Learn effective digital marketing strategies for your business.',
                'content_body_ar' => 'تعلم استراتيجيات التسويق الرقمي الفعالة لأعمالك.',
                'content_type' => 'event',
                'is_published' => true,
                'meta_description' => 'Digital marketing workshop details',
                'meta_description_ar' => 'تفاصيل ورشة التسويق الرقمي',
                'keywords' => 'marketing, digital, workshop',
                'keywords_ar' => 'تسويق، رقمي، ورشة عمل',
                'featured_image' => 'digital-marketing.jpg',
                'language_code' => 'en',
                'categories' => ['Events', 'Marketing']
            ],
            [
                'title' => 'Privacy Policy',
                'title_ar' => 'سياسة الخصوصية',
                'content_body' => 'Our commitment to protecting your privacy and personal information.',
                'content_body_ar' => 'التزامنا بحماية خصوصيتك ومعلوماتك الشخصية.',
                'content_type' => 'page',
                'is_published' => true,
                'meta_description' => 'Privacy policy and data protection',
                'meta_description_ar' => 'سياسة الخصوصية وحماية البيانات',
                'keywords' => 'privacy, policy, terms',
                'keywords_ar' => 'خصوصية، سياسة، شروط',
                'featured_image' => 'privacy-policy.jpg',
                'language_code' => 'en',
                'categories' => ['Legal']
            ],
            [
                'title' => '5G Technology Impact',
                'title_ar' => 'تأثير تقنية الجيل الخامس',
                'content_body' => 'Exploring how 5G technology is transforming industries and connectivity.',
                'content_body_ar' => 'استكشاف كيف تحول تقنية الجيل الخامس الصناعات والاتصال.',
                'content_type' => 'article',
                'is_published' => true,
                'meta_description' => '5G technology impact and applications',
                'meta_description_ar' => 'تأثير وتطبيقات تقنية الجيل الخامس',
                'keywords' => '5G, technology, connectivity',
                'keywords_ar' => 'جيل خامس، تكنولوجيا، اتصال',
                'featured_image' => '5g-technology.jpg',
                'language_code' => 'en',
                'categories' => ['Technology']
            ],
            [
                'title' => 'Terms of Service',
                'title_ar' => 'شروط الخدمة',
                'content_body' => 'Read our terms of service and usage guidelines.',
                'content_body_ar' => 'اقرأ شروط خدمتنا وإرشادات الاستخدام.',
                'content_type' => 'page',
                'is_published' => true,
                'meta_description' => 'Terms of service and usage guidelines',
                'meta_description_ar' => 'شروط الخدمة وإرشادات الاستخدام',
                'keywords' => 'terms, service, guidelines',
                'keywords_ar' => 'شروط، خدمة، إرشادات',
                'featured_image' => 'terms.jpg',
                'language_code' => 'en',
                'categories' => ['Legal']
            ],
            [
                'title' => 'IoT Security Challenges',
                'title_ar' => 'تحديات أمن إنترنت الأشياء',
                'content_body' => 'Addressing security challenges in the Internet of Things ecosystem.',
                'content_body_ar' => 'معالجة تحديات الأمن في نظام إنترنت الأشياء.',
                'content_type' => 'article',
                'is_published' => true,
                'meta_description' => 'IoT security challenges and solutions',
                'meta_description_ar' => 'تحديات وحلول أمن إنترنت الأشياء',
                'keywords' => 'IoT, security, challenges',
                'keywords_ar' => 'إنترنت الأشياء، أمن، تحديات',
                'featured_image' => 'iot-security.jpg',
                'language_code' => 'en',
                'categories' => ['Technology', 'Security']
            ],
            [
                'title' => 'Customer Support',
                'title_ar' => 'دعم العملاء',
                'content_body' => 'How to get help and support for our products and services.',
                'content_body_ar' => 'كيفية الحصول على المساعدة والدعم لمنتجاتنا وخدماتنا.',
                'content_type' => 'page',
                'is_published' => true,
                'meta_description' => 'Customer support and help center',
                'meta_description_ar' => 'دعم العملاء ومركز المساعدة',
                'keywords' => 'support, help, customer',
                'keywords_ar' => 'دعم، مساعدة، عميل',
                'featured_image' => 'customer-support.jpg',
                'language_code' => 'en',
                'categories' => ['Support']
            ],
            [
                'title' => 'Future of AI Development',
                'title_ar' => 'مستقبل تطوير الذكاء الاصطناعي',
                'content_body' => 'Exploring the future trends and possibilities in AI development.',
                'content_body_ar' => 'استكشاف اتجاهات وإمكانيات المستقبل في تطوير الذكاء الاصطناعي.',
                'content_type' => 'article',
                'is_published' => true,
                'meta_description' => 'Future of AI development trends',
                'meta_description_ar' => 'اتجاهات مستقبل تطوير الذكاء الاصطناعي',
                'keywords' => 'AI, future, development',
                'keywords_ar' => 'ذكاء اصطناعي، مستقبل، تطوير',
                'featured_image' => 'ai-future.jpg',
                'language_code' => 'en',
                'categories' => ['Technology']
            ],
            [
                'title' => 'FAQ',
                'title_ar' => 'الأسئلة الشائعة',
                'content_body' => 'Frequently asked questions about our products and services.',
                'content_body_ar' => 'الأسئلة الشائعة حول منتجاتنا وخدماتنا.',
                'content_type' => 'page',
                'is_published' => true,
                'meta_description' => 'Frequently asked questions and answers',
                'meta_description_ar' => 'الأسئلة الشائعة والأجوبة',
                'keywords' => 'FAQ, questions, answers',
                'keywords_ar' => 'أسئلة شائعة، أسئلة، إجابات',
                'featured_image' => 'faq.jpg',
                'language_code' => 'en',
                'categories' => ['Support']
            ],
            [
                'title' => 'DevOps Best Practices',
                'title_ar' => 'أفضل ممارسات DevOps',
                'content_body' => 'Learn essential DevOps practices for modern software development.',
                'content_body_ar' => 'تعلم ممارسات DevOps الأساسية لتطوير البرمجيات الحديثة.',
                'content_type' => 'article',
                'is_published' => true,
                'meta_description' => 'DevOps best practices and guidelines',
                'meta_description_ar' => 'أفضل ممارسات وإرشادات DevOps',
                'keywords' => 'DevOps, development, practices',
                'keywords_ar' => 'DevOps، تطوير، ممارسات',
                'featured_image' => 'devops.jpg',
                'language_code' => 'en',
                'categories' => ['Technology']
            ],
            [
                'title' => 'Product Launch Event',
                'title_ar' => 'حدث إطلاق المنتج',
                'content_body' => 'Join us for the launch of our latest innovative product.',
                'content_body_ar' => 'انضم إلينا لإطلاق أحدث منتج مبتكر لدينا.',
                'content_type' => 'event',
                'is_published' => true,
                'meta_description' => 'Product launch event details',
                'meta_description_ar' => 'تفاصيل حدث إطلاق المنتج',
                'keywords' => 'product, launch, event',
                'keywords_ar' => 'منتج، إطلاق، حدث',
                'featured_image' => 'product-launch.jpg',
                'language_code' => 'en',
                'categories' => ['Events', 'Products']
            ],
            [
                'title' => 'Career Opportunities',
                'title_ar' => 'فرص العمل',
                'content_body' => 'Explore exciting career opportunities with our growing team.',
                'content_body_ar' => 'اكتشف فرص عمل مثيرة مع فريقنا المتنامي.',
                'content_type' => 'page',
                'is_published' => true,
                'meta_description' => 'Career opportunities and job openings',
                'meta_description_ar' => 'فرص العمل والوظائف الشاغرة',
                'keywords' => 'careers, jobs, opportunities',
                'keywords_ar' => 'وظائف، عمل، فرص',
                'featured_image' => 'careers.jpg',
                'language_code' => 'en',
                'categories' => ['Careers']
            ],
            [
                'title' => 'Machine Learning Fundamentals',
                'title_ar' => 'أساسيات التعلم الآلي',
                'content_body' => 'Understanding the basics of machine learning and its applications.',
                'content_body_ar' => 'فهم أساسيات التعلم الآلي وتطبيقاته.',
                'content_type' => 'article',
                'is_published' => true,
                'meta_description' => 'Machine learning basics and applications',
                'meta_description_ar' => 'أساسيات وتطبيقات التعلم الآلي',
                'keywords' => 'machine learning, AI, technology',
                'keywords_ar' => 'تعلم آلي، ذكاء اصطناعي، تكنولوجيا',
                'featured_image' => 'machine-learning.jpg',
                'language_code' => 'en',
                'categories' => ['Technology']
            ]
        ];

        foreach ($contents as $contentData) {
            $categories = $contentData['categories'];
            unset($contentData['categories']);

            $contentData['slug'] = Str::slug($contentData['title']);
            $contentData['slug_ar'] = Str::slug($contentData['title_ar']);
            $contentData['author_id'] = $users->random()->id;

            $content = Content::create($contentData);

            // Attach categories
            foreach ($categories as $categoryName) {
                $category = Category::where('name', $categoryName)->first();
                if ($category) {
                    $content->categories()->attach($category->category_id);
                }
            }
        }
    }
} 