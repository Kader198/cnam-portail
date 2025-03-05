<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Content;
use App\Models\Setting;
use App\Models\Directory;
use App\Models\Department;
use App\Models\Glossary;
use App\Models\Faq;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function index()
    {
        // Get welcome message content
        $welcomeContent = Content::where('content_type', 'welcome_message')
            ->where('is_published', true)
            ->first();

        // Get latest news
        $latestNews = News::where('is_published', true)
            ->orderBy('publication_date', 'desc')
            ->take(3)
            ->get();

        // Get testimonials
        $testimonials = Content::where('content_type', 'testimonial')
            ->where('is_published', true)
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get();

        // Get contact information from settings
        $contactSettings = Setting::where('setting_group', 'contact')
            ->where('is_system', true)
            ->get()
            ->pluck('setting_value', 'setting_key');

        // Get practical information
        $practicalInfo = Content::where('content_type', 'practical_info')
            ->where('is_published', true)
            ->first();

        // Get service providers (directories)
        $serviceProviders = Directory::with('department')
            ->where('is_published', true)
            ->orderBy('entity_name')
            ->take(6)
            ->get();

        // Get departments for services section
        $departments = Department::with('directories')
            ->whereNull('parent_department_id')
            ->where('is_active', true)
            ->get();

        // Get FAQs
        $faqs = Faq::where('is_published', true)
            ->orderBy('display_order')
            ->take(5)
            ->get();

        // Get glossary terms for quick reference
        $glossaryTerms = Glossary::orderBy('display_order')
            ->take(4)
            ->get();

        return response()->json([
            'welcome_message' => $welcomeContent,
            'latest_news' => $latestNews,
            'testimonials' => $testimonials,
            'contact_info' => $contactSettings,
            'practical_info' => $practicalInfo,
            'service_providers' => $serviceProviders,
            'departments' => $departments,
            'faqs' => $faqs,
            'glossary_terms' => $glossaryTerms,
        ]);
    }

    public function getNews()
    {
        $news = News::where('is_published', true)
            ->orderBy('publication_date', 'desc')
            ->paginate(10);

        return response()->json($news);
    }

    public function getTestimonials()
    {
        $testimonials = Content::where('content_type', 'testimonial')
            ->where('is_published', true)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($testimonials);
    }

    public function getServiceProviders()
    {
        $providers = Directory::with('department')
            ->where('is_published', true)
            ->orderBy('entity_name')
            ->paginate(20);

        return response()->json($providers);
    }

    public function getFaqs()
    {
        $faqs = Faq::where('is_published', true)
            ->orderBy('display_order')
            ->get();

        return response()->json($faqs);
    }

    public function getGlossary()
    {
        $glossary = Glossary::orderBy('display_order')
            ->paginate(20);

        return response()->json($glossary);
    }
} 