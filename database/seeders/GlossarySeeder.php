<?php

namespace Database\Seeders;

use App\Models\Glossary;
use Illuminate\Database\Seeder;

class GlossarySeeder extends Seeder
{
    public function run(): void
    {
        $terms = [
            [
                'term' => 'Medical Insurance',
                'term_ar' => 'التأمين الطبي',
                'definition' => 'A type of insurance coverage that pays for medical and surgical expenses incurred by the insured.',
                'definition_ar' => 'نوع من التأمين يغطي النفقات الطبية والجراحية التي يتكبدها المؤمن عليه.',
                'first_letter' => 'M',
                'first_letter_ar' => 'ت',
                'display_order' => 1,
            ],
            [
                'term' => 'Beneficiary',
                'term_ar' => 'المستفيد',
                'definition' => 'A person who is entitled to receive benefits from the medical insurance coverage.',
                'definition_ar' => 'الشخص الذي يحق له تلقي المزايا من تغطية التأمين الطبي.',
                'first_letter' => 'B',
                'first_letter_ar' => 'م',
                'display_order' => 2,
            ],
            [
                'term' => 'Coverage',
                'term_ar' => 'التغطية',
                'definition' => 'The scope of protection provided by the insurance policy.',
                'definition_ar' => 'نطاق الحماية التي يوفرها بوليصة التأمين.',
                'first_letter' => 'C',
                'first_letter_ar' => 'ت',
                'display_order' => 3,
            ],
            [
                'term' => 'Premium',
                'term_ar' => 'القسط',
                'definition' => 'The amount paid periodically to keep the insurance policy active.',
                'definition_ar' => 'المبلغ المدفوع دورياً للحفاظ على سريان بوليصة التأمين.',
                'first_letter' => 'P',
                'first_letter_ar' => 'ق',
                'display_order' => 4,
            ],
            [
                'term' => 'Deductible',
                'term_ar' => 'الخصم',
                'definition' => 'The amount that must be paid out of pocket before the insurance coverage begins.',
                'definition_ar' => 'المبلغ الذي يجب دفعه من جيب المؤمن عليه قبل بدء تغطية التأمين.',
                'first_letter' => 'D',
                'first_letter_ar' => 'خ',
                'display_order' => 5,
            ],
        ];

        foreach ($terms as $term) {
            Glossary::create($term);
        }
    }
} 