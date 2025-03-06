<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        $news = [
            [
                'title' => 'CNAM Launches New Digital Services Platform',
                'title_ar' => 'إطلاق منصة الخدمات الرقمية الجديدة للوكالة الوطنية للتأمين الطبي',
                'content_body' => 'The National Medical Insurance Agency (CNAM) is pleased to announce the launch of its new digital services platform. This innovative platform will provide enhanced accessibility and convenience for all our beneficiaries.',
                'content_body_ar' => 'يسر الوكالة الوطنية للتأمين الطبي (CNAM) أن تعلن عن إطلاق منصة الخدمات الرقمية الجديدة. ستوفر هذه المنصة المبتكرة سهولة الوصول والراحة لجميع المستفيدين.',
                'is_published' => true,
                'publication_date' => '2024-03-05',
                'news_type' => 'announcement',
                'featured' => true,
                'author_id' => 1,
            ],
            [
                'title' => 'CNAM Hosts Healthcare Innovation Conference',
                'title_ar' => 'استضافة مؤتمر الابتكار في الرعاية الصحية',
                'content_body' => 'CNAM is organizing a major healthcare innovation conference bringing together industry experts, healthcare providers, and policymakers to discuss the future of healthcare in Mauritania.',
                'content_body_ar' => 'تنظم الوكالة الوطنية للتأمين الطبي مؤتمراً كبيراً للابتكار في الرعاية الصحية يجمع خبراء الصناعة ومقدمي الرعاية الصحية وصناع القرار لمناقشة مستقبل الرعاية الصحية في موريتانيا.',
                'is_published' => true,
                'publication_date' => '2024-03-10',
                'news_type' => 'event',
                'featured' => true,
                'author_id' => 1,
            ],
            [
                'title' => 'New Partnership with Leading Healthcare Providers',
                'title_ar' => 'شراكة جديدة مع مقدمي الرعاية الصحية الرائدين',
                'content_body' => 'CNAM has signed strategic partnerships with leading healthcare providers to expand coverage and improve service quality for our beneficiaries.',
                'content_body_ar' => 'وقعت الوكالة الوطنية للتأمين الطبي شراكات استراتيجية مع مقدمي الرعاية الصحية الرائدين لتوسيع التغطية وتحسين جودة الخدمات لمستفيديها.',
                'is_published' => true,
                'publication_date' => '2024-03-15',
                'news_type' => 'general',
                'featured' => false,
                'author_id' => 1,
            ],
        ];

        foreach ($news as $item) {
            $item['slug'] = Str::slug($item['title']);
            $item['slug_ar'] = Str::slug($item['title_ar']);
            News::create($item);
        }
    }
}