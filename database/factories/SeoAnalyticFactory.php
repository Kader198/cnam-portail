<?php

namespace Database\Factories;

use App\Models\SeoAnalytic;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class SeoAnalyticFactory extends Factory
{
    protected $model = SeoAnalytic::class;

    public function definition()
    {
        $title = $this->faker->sentence();

        return [
            'page_url' => $this->faker->url(),
            'page_title' => $title,
            'page_title_ar' => 'عنوان الصفحة',
            'meta_description' => $this->faker->sentence(),
            'meta_description_ar' => 'وصف الصفحة',
            'keywords' => $this->faker->words(3, true),
            'keywords_ar' => 'كلمات مفتاحية',
            'visitors' => $this->faker->numberBetween(100, 1000),
            'unique_visitors' => $this->faker->numberBetween(50, 500),
            'bounce_rate' => $this->faker->randomFloat(1, 10, 50),
            'avg_time_on_page' => $this->faker->numberBetween(30, 300),
            'record_date' => $this->faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d'),
            'slug' => Str::slug($title),
            'slug_ar' => Str::slug('عنوان الصفحة')
        ];
    }
}