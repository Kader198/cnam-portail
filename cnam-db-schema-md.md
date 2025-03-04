# CNAM Web Portal Database Schema

## Overview

This document outlines the complete database schema for the CNAM web portal, designed to support all features outlined in the sprint plan. The schema includes multilingual support with specific consideration for Arabic language content.

## Database Tables

### User Management

#### USERS
| Column | Type | Description |
|--------|------|-------------|
| user_id | INT | Primary key |
| username | VARCHAR(50) | Unique username |
| email | VARCHAR(100) | User email address |
| password_hash | VARCHAR(255) | Encrypted password |
| first_name | VARCHAR(100) | User's first name |
| first_name_ar | VARCHAR(100) | User's first name in Arabic |
| last_name | VARCHAR(100) | User's last name |
| last_name_ar | VARCHAR(100) | User's last name in Arabic |
| created_at | DATETIME | Account creation timestamp |
| last_login | DATETIME | Last login timestamp |
| is_active | BOOLEAN | Account status |
| profile_image | VARCHAR(255) | Path to profile image |
| phone_number | VARCHAR(20) | Contact phone number |
| preferred_language | VARCHAR(10) | User's preferred language code |

#### ROLES
| Column | Type | Description |
|--------|------|-------------|
| role_id | INT | Primary key |
| role_name | VARCHAR(50) | Role name |
| role_name_ar | VARCHAR(100) | Role name in Arabic |
| description | TEXT | Role description |
| description_ar | TEXT | Role description in Arabic |
| permission_level | INT | Hierarchy level for this role |

#### USER_ROLES
| Column | Type | Description |
|--------|------|-------------|
| user_role_id | INT | Primary key |
| user_id | INT | Foreign key to USERS |
| role_id | INT | Foreign key to ROLES |
| assigned_at | DATETIME | When role was assigned |

#### PERMISSIONS
| Column | Type | Description |
|--------|------|-------------|
| permission_id | INT | Primary key |
| permission_name | VARCHAR(100) | Permission identifier |
| description | TEXT | Permission description |
| description_ar | TEXT | Permission description in Arabic |

#### ROLE_PERMISSIONS
| Column | Type | Description |
|--------|------|-------------|
| role_permission_id | INT | Primary key |
| role_id | INT | Foreign key to ROLES |
| permission_id | INT | Foreign key to PERMISSIONS |

### Content Management

#### CONTENT
| Column | Type | Description |
|--------|------|-------------|
| content_id | INT | Primary key |
| title | VARCHAR(255) | Content title |
| title_ar | VARCHAR(255) | Content title in Arabic |
| content_body | TEXT | Main content |
| content_body_ar | TEXT | Main content in Arabic |
| content_type | VARCHAR(50) | Type (page, post, etc.) |
| author_id | INT | Foreign key to USERS |
| created_at | DATETIME | Creation timestamp |
| updated_at | DATETIME | Last update timestamp |
| is_published | BOOLEAN | Publication status |
| slug | VARCHAR(255) | URL-friendly identifier |
| slug_ar | VARCHAR(255) | URL-friendly identifier for Arabic |
| featured_image | VARCHAR(255) | Path to featured image |
| meta_description | TEXT | SEO meta description |
| meta_description_ar | TEXT | SEO meta description in Arabic |
| keywords | VARCHAR(255) | SEO keywords |
| keywords_ar | VARCHAR(255) | SEO keywords in Arabic |
| language_code | VARCHAR(10) | Primary language of content |

#### CONTENT_VERSIONS
| Column | Type | Description |
|--------|------|-------------|
| version_id | INT | Primary key |
| content_id | INT | Foreign key to CONTENT |
| content_body | TEXT | Versioned content body |
| content_body_ar | TEXT | Versioned content body in Arabic |
| title | VARCHAR(255) | Versioned title |
| title_ar | VARCHAR(255) | Versioned title in Arabic |
| author_id | INT | Foreign key to USERS |
| created_at | DATETIME | Version creation timestamp |
| change_summary | VARCHAR(255) | Description of changes |

#### CATEGORIES
| Column | Type | Description |
|--------|------|-------------|
| category_id | INT | Primary key |
| name | VARCHAR(100) | Category name |
| name_ar | VARCHAR(100) | Category name in Arabic |
| description | TEXT | Category description |
| description_ar | TEXT | Category description in Arabic |
| parent_category_id | INT | Self-referencing foreign key |
| slug | VARCHAR(100) | URL-friendly identifier |
| slug_ar | VARCHAR(100) | URL-friendly identifier for Arabic |

#### CONTENT_CATEGORIES
| Column | Type | Description |
|--------|------|-------------|
| content_category_id | INT | Primary key |
| content_id | INT | Foreign key to CONTENT |
| category_id | INT | Foreign key to CATEGORIES |

#### MEDIA
| Column | Type | Description |
|--------|------|-------------|
| media_id | INT | Primary key |
| file_name | VARCHAR(255) | Original filename |
| file_path | VARCHAR(255) | Storage path |
| media_type | VARCHAR(50) | Media type (image, video, etc.) |
| uploaded_by | INT | Foreign key to USERS |
| upload_date | DATETIME | Upload timestamp |
| alt_text | VARCHAR(255) | Accessibility text |
| alt_text_ar | VARCHAR(255) | Accessibility text in Arabic |
| title | VARCHAR(255) | Media title |
| title_ar | VARCHAR(255) | Media title in Arabic |
| description | TEXT | Media description |
| description_ar | TEXT | Media description in Arabic |
| file_size | INT | Size in bytes |

#### CONTENT_MEDIA
| Column | Type | Description |
|--------|------|-------------|
| content_media_id | INT | Primary key |
| content_id | INT | Foreign key to CONTENT |
| media_id | INT | Foreign key to MEDIA |

### Modules

#### NEWS
| Column | Type | Description |
|--------|------|-------------|
| news_id | INT | Primary key |
| content_id | INT | Foreign key to CONTENT |
| publication_date | DATETIME | When to publish |
| news_type | VARCHAR(50) | News category type |
| featured | BOOLEAN | Featured on homepage |

#### DIRECTORY
| Column | Type | Description |
|--------|------|-------------|
| directory_id | INT | Primary key |
| entity_name | VARCHAR(255) | Organization entity name |
| entity_name_ar | VARCHAR(255) | Organization entity name in Arabic |
| description | TEXT | Entity description |
| description_ar | TEXT | Entity description in Arabic |
| contact_person | VARCHAR(100) | Contact name |
| contact_person_ar | VARCHAR(100) | Contact name in Arabic |
| phone | VARCHAR(20) | Contact phone |
| email | VARCHAR(100) | Contact email |
| address | TEXT | Physical address |
| address_ar | TEXT | Physical address in Arabic |
| department_id | INT | Foreign key to DEPARTMENTS |
| website | VARCHAR(255) | Entity website URL |
| hours | VARCHAR(255) | Operating hours |
| hours_ar | VARCHAR(255) | Operating hours in Arabic |
| position | VARCHAR(100) | Position in organization |
| position_ar | VARCHAR(100) | Position in organization in Arabic |

#### DEPARTMENTS
| Column | Type | Description |
|--------|------|-------------|
| department_id | INT | Primary key |
| name | VARCHAR(100) | Department name |
| name_ar | VARCHAR(100) | Department name in Arabic |
| description | TEXT | Department description |
| description_ar | TEXT | Department description in Arabic |
| parent_department_id | INT | Self-referencing foreign key |

#### FAQ
| Column | Type | Description |
|--------|------|-------------|
| faq_id | INT | Primary key |
| question | TEXT | Question text |
| question_ar | TEXT | Question text in Arabic |
| answer | TEXT | Answer text |
| answer_ar | TEXT | Answer text in Arabic |
| category_id | INT | Foreign key to CATEGORIES |
| display_order | INT | Order for display |
| is_published | BOOLEAN | Publication status |

#### GLOSSARY
| Column | Type | Description |
|--------|------|-------------|
| glossary_id | INT | Primary key |
| term | VARCHAR(100) | Term or word |
| term_ar | VARCHAR(100) | Term or word in Arabic |
| definition | TEXT | Definition text |
| definition_ar | TEXT | Definition text in Arabic |
| first_letter | VARCHAR(5) | First letter for indexing |
| first_letter_ar | VARCHAR(5) | First letter for indexing in Arabic |
| display_order | INT | Order for display |

### Interactive Features

#### CONTACT_FORMS
| Column | Type | Description |
|--------|------|-------------|
| form_id | INT | Primary key |
| form_name | VARCHAR(100) | Form identifier |
| form_name_ar | VARCHAR(100) | Form identifier in Arabic |
| description | TEXT | Form description |
| description_ar | TEXT | Form description in Arabic |
| is_active | BOOLEAN | Form availability |
| email_recipient | VARCHAR(255) | Where to send submissions |

#### FORM_FIELDS
| Column | Type | Description |
|--------|------|-------------|
| field_id | INT | Primary key |
| form_id | INT | Foreign key to CONTACT_FORMS |
| field_name | VARCHAR(100) | Field identifier |
| field_name_ar | VARCHAR(100) | Field identifier in Arabic |
| field_label | VARCHAR(100) | Display label |
| field_label_ar | VARCHAR(100) | Display label in Arabic |
| field_type | VARCHAR(50) | Field type (text, email, etc.) |
| required | BOOLEAN | Whether field is required |
| display_order | INT | Order in form |
| validation_rules | VARCHAR(255) | Validation patterns |
| placeholder | VARCHAR(255) | Placeholder text |
| placeholder_ar | VARCHAR(255) | Placeholder text in Arabic |

#### FORM_SUBMISSIONS
| Column | Type | Description |
|--------|------|-------------|
| submission_id | INT | Primary key |
| form_id | INT | Foreign key to CONTACT_FORMS |
| form_data | JSON | Submitted data |
| submitted_at | DATETIME | Submission timestamp |
| ip_address | VARCHAR(45) | Submitter's IP address |
| status | VARCHAR(50) | Processing status |

#### SOCIAL_MEDIA
| Column | Type | Description |
|--------|------|-------------|
| social_media_id | INT | Primary key |
| platform | VARCHAR(50) | Platform name |
| handle | VARCHAR(100) | Account handle |
| url | VARCHAR(255) | Profile URL |
| is_active | BOOLEAN | Display status |
| icon | VARCHAR(255) | Icon reference |
| description | VARCHAR(255) | Short description |
| description_ar | VARCHAR(255) | Short description in Arabic |

#### POLLS
| Column | Type | Description |
|--------|------|-------------|
| poll_id | INT | Primary key |
| question | TEXT | Poll question |
| question_ar | TEXT | Poll question in Arabic |
| start_date | DATETIME | Poll start date |
| end_date | DATETIME | Poll end date |
| is_active | BOOLEAN | Active status |
| allow_multiple_choices | BOOLEAN | Multiple selection option |
| created_by | INT | Foreign key to USERS |

#### POLL_OPTIONS
| Column | Type | Description |
|--------|------|-------------|
| option_id | INT | Primary key |
| poll_id | INT | Foreign key to POLLS |
| option_text | VARCHAR(255) | Option text |
| option_text_ar | VARCHAR(255) | Option text in Arabic |
| display_order | INT | Order in poll |

#### POLL_RESPONSES
| Column | Type | Description |
|--------|------|-------------|
| response_id | INT | Primary key |
| poll_id | INT | Foreign key to POLLS |
| option_id | INT | Foreign key to POLL_OPTIONS |
| user_id | INT | Foreign key to USERS (can be NULL) |
| response_time | DATETIME | Response timestamp |
| ip_address | VARCHAR(45) | Respondent's IP address |

#### FORUM_TOPICS
| Column | Type | Description |
|--------|------|-------------|
| topic_id | INT | Primary key |
| title | VARCHAR(255) | Topic title |
| title_ar | VARCHAR(255) | Topic title in Arabic |
| description | TEXT | Topic description |
| description_ar | TEXT | Topic description in Arabic |
| created_by | INT | Foreign key to USERS |
| created_at | DATETIME | Creation timestamp |
| category_id | INT | Foreign key to CATEGORIES |
| is_sticky | BOOLEAN | Pinned status |
| is_closed | BOOLEAN | Whether topic is closed |
| views_count | INT | Number of views |

#### FORUM_POSTS
| Column | Type | Description |
|--------|------|-------------|
| post_id | INT | Primary key |
| topic_id | INT | Foreign key to FORUM_TOPICS |
| content | TEXT | Post content |
| content_ar | TEXT | Post content in Arabic |
| author_id | INT | Foreign key to USERS |
| created_at | DATETIME | Creation timestamp |
| updated_at | DATETIME | Last update timestamp |
| is_solution | BOOLEAN | Whether marked as solution |

#### NEWSLETTER
| Column | Type | Description |
|--------|------|-------------|
| newsletter_id | INT | Primary key |
| title | VARCHAR(255) | Newsletter title |
| title_ar | VARCHAR(255) | Newsletter title in Arabic |
| content | TEXT | Newsletter content |
| content_ar | TEXT | Newsletter content in Arabic |
| created_at | DATETIME | Creation timestamp |
| sent_at | DATETIME | Dispatch timestamp |
| created_by | INT | Foreign key to USERS |
| status | VARCHAR(50) | Draft, scheduled, sent |

#### NEWSLETTER_SUBSCRIBERS
| Column | Type | Description |
|--------|------|-------------|
| subscriber_id | INT | Primary key |
| email | VARCHAR(255) | Subscriber email |
| name | VARCHAR(100) | Subscriber name |
| subscribed_at | DATETIME | Subscription timestamp |
| is_active | BOOLEAN | Subscription status |
| language_preference | VARCHAR(10) | Preferred language |

### Multimedia & Dynamic Content

#### VIRTUAL_TOURS
| Column | Type | Description |
|--------|------|-------------|
| tour_id | INT | Primary key |
| title | VARCHAR(255) | Tour title |
| title_ar | VARCHAR(255) | Tour title in Arabic |
| description | TEXT | Tour description |
| description_ar | TEXT | Tour description in Arabic |
| panorama_url | VARCHAR(255) | URL to panorama resource |
| created_by | INT | Foreign key to USERS |
| created_at | DATETIME | Creation timestamp |
| is_published | BOOLEAN | Publication status |

#### TOUR_HOTSPOTS
| Column | Type | Description |
|--------|------|-------------|
| hotspot_id | INT | Primary key |
| tour_id | INT | Foreign key to VIRTUAL_TOURS |
| title | VARCHAR(100) | Hotspot title |
| title_ar | VARCHAR(100) | Hotspot title in Arabic |
| description | TEXT | Hotspot description |
| description_ar | TEXT | Hotspot description in Arabic |
| x_position | FLOAT | X coordinate |
| y_position | FLOAT | Y coordinate |
| hotspot_type | VARCHAR(50) | Type of hotspot |
| target_id | VARCHAR(255) | Target reference |

### Multilingual Support

#### LANGUAGES
| Column | Type | Description |
|--------|------|-------------|
| language_id | INT | Primary key |
| language_code | VARCHAR(10) | ISO language code |
| language_name | VARCHAR(100) | Language name |
| native_name | VARCHAR(100) | Name in native language |
| is_active | BOOLEAN | Whether available |
| is_default | BOOLEAN | Default language |
| direction | VARCHAR(3) | Text direction (LTR/RTL) |

#### TRANSLATIONS
| Column | Type | Description |
|--------|------|-------------|
| translation_id | INT | Primary key |
| content_id | INT | Foreign key to CONTENT |
| language_id | INT | Foreign key to LANGUAGES |
| translated_title | VARCHAR(255) | Translated title |
| translated_content | TEXT | Translated content |
| translator_id | INT | Foreign key to USERS |
| translated_at | DATETIME | Translation timestamp |
| is_approved | BOOLEAN | Approval status |
| approved_by | INT | Foreign key to USERS |

### System Features

#### AUDIT_LOGS
| Column | Type | Description |
|--------|------|-------------|
| log_id | INT | Primary key |
| user_id | INT | Foreign key to USERS |
| action | VARCHAR(100) | Action performed |
| entity_type | VARCHAR(100) | Type of affected entity |
| entity_id | INT | ID of affected entity |
| timestamp | DATETIME | When action occurred |
| ip_address | VARCHAR(45) | User's IP address |
| additional_data | JSON | Extra contextual data |

#### SETTINGS
| Column | Type | Description |
|--------|------|-------------|
| setting_id | INT | Primary key |
| setting_key | VARCHAR(100) | Setting identifier |
| setting_value | TEXT | Setting value |
| setting_value_ar | TEXT | Setting value in Arabic |
| setting_group | VARCHAR(100) | Grouping category |
| is_system | BOOLEAN | Whether system-controlled |
| is_translatable | BOOLEAN | Can be translated |

#### THEMES
| Column | Type | Description |
|--------|------|-------------|
| theme_id | INT | Primary key |
| theme_name | VARCHAR(100) | Theme identifier |
| theme_name_ar | VARCHAR(100) | Theme identifier in Arabic |
| description | TEXT | Theme description |
| description_ar | TEXT | Theme description in Arabic |
| is_active | BOOLEAN | Whether current theme |
| preview_image | VARCHAR(255) | Path to preview image |

#### MENUS
| Column | Type | Description |
|--------|------|-------------|
| menu_id | INT | Primary key |
| menu_name | VARCHAR(100) | Menu identifier |
| menu_name_ar | VARCHAR(100) | Menu identifier in Arabic |
| location | VARCHAR(100) | Display location |
| is_active | BOOLEAN | Visibility status |

#### MENU_ITEMS
| Column | Type | Description |
|--------|------|-------------|
| item_id | INT | Primary key |
| menu_id | INT | Foreign key to MENUS |
| item_title | VARCHAR(100) | Item text |
| item_title_ar | VARCHAR(100) | Item text in Arabic |
| url | VARCHAR(255) | Link destination |
| parent_item_id | INT | Self-referencing foreign key |
| display_order | INT | Order in menu |
| target | VARCHAR(20) | Link target (_blank, etc.) |
| icon | VARCHAR(100) | Icon reference |
| css_class | VARCHAR(100) | Custom CSS class |

#### SEO_ANALYTICS
| Column | Type | Description |
|--------|------|-------------|
| analytics_id | INT | Primary key |
| page_url | VARCHAR(255) | Page URL |
| visitors | INT | Total visitors |
| unique_visitors | INT | Unique visitor count |
| bounce_rate | FLOAT | Bounce rate percentage |
| avg_time_on_page | INT | Average time in seconds |
| record_date | DATE | Date of record |

## Implementation by Sprint

### Sprint 1: Foundation & Configuration

Tables to implement:
- USERS (core fields only)
- ROLES
- USER_ROLES
- PERMISSIONS
- ROLE_PERMISSIONS
- SETTINGS (basic configuration)
- LANGUAGES
- AUDIT_LOGS (basic structure)

Key considerations:
- Ensure proper setup of Arabic language fields
- Configure database collation for UTF-8 with Arabic support
- Setup RTL text direction support in LANGUAGES table

### Sprint 2: Architecture of Base

Tables to extend:
- Complete USERS table with all fields
- Finalize authentication-related tables
- Complete LANGUAGES table implementation
- Setup initial system SETTINGS

Key considerations:
- Implement security fields with proper encryption
- Configure multilingual user profiles
- Setup linguistic preferences

### Sprint 3: Content Management

Tables to implement:
- CONTENT
- CONTENT_VERSIONS
- CATEGORIES
- CONTENT_CATEGORIES
- MEDIA
- CONTENT_MEDIA

Key considerations:
- Ensure all content tables include Arabic language fields
- Setup versioning system with language support
- Configure media library with multilingual metadata

### Sprint 4: Front Office Modules

Tables to implement:
- NEWS
- DIRECTORY
- DEPARTMENTS
- GLOSSARY
- FAQ

Key considerations:
- All modules should support Arabic content
- Directory and department structure should accommodate bilingual information
- FAQ and glossary systems should support Arabic indexing

### Sprint 5: Extensions Front Office

Tables to implement:
- CONTACT_FORMS
- FORM_FIELDS
- FORM_SUBMISSIONS
- SOCIAL_MEDIA
- SEO_ANALYTICS

Key considerations:
- Form builder should support Arabic field labels and validation messages
- Social media integration should handle Arabic content
- Analytics should track language-specific metrics

### Sprint 6: Interactive Features

Tables to implement:
- POLLS
- POLL_OPTIONS
- POLL_RESPONSES
- FORUM_TOPICS
- FORUM_POSTS
- NEWSLETTER
- NEWSLETTER_SUBSCRIBERS

Key considerations:
- Interactive features should fully support Arabic content
- Poll system should handle RTL text direction
- Forum system should support Arabic content search and sorting
- Newsletter system should support language preferences

### Sprint 7: Mobile & Dynamic Content

Tables to implement:
- VIRTUAL_TOURS
- TOUR_HOTSPOTS
- Extend MEDIA table for video support

Key considerations:
- Virtual tour UI should accommodate Arabic text and RTL direction
- Mobile optimization should consider Arabic text rendering

### Sprint 8: Back Office & Administration

Tables to implement:
- THEMES
- MENUS
- MENU_ITEMS
- Extend SETTINGS for GDPR compliance

Key considerations:
- Admin interface should fully support Arabic content management
- Theme system should support RTL layouts
- Menu builder should handle Arabic menu items

### Sprint 9: Security & Performance

Enhancements:
- Add indices to improve query performance
- Implement table partitioning for large multilingual content
- Add integrity constraints and foreign keys
- Create views for common multilingual queries

Key considerations:
- Optimize database for multilingual search performance
- Implement language-specific caching strategies
- Configure backup procedures with language integrity verification

## Relationships and Integrity Constraints

1. All foreign keys should be properly indexed
2. Many-to-many relationships implemented with junction tables
3. Hierarchical structures implemented with self-referencing foreign keys
4. Language-specific constraints:
   - Default language content should always exist before translations
   - Language codes should match ISO standards
   - RTL/LTR direction properly marked for display rendering

## Notes for Arabic Language Support

1. **Character Set and Collation**:
   - Use `utf8mb4` character set and `utf8mb4_unicode_ci` collation to properly support Arabic characters

2. **Text Direction**:
   - Store text direction (RTL for Arabic) in the LANGUAGES table
   - Use direction attribute in frontend rendering

3. **Search Optimization**:
   - Configure full-text search with Arabic language support
   - Consider specialized Arabic stemming and indexing

4. **Data Validation**:
   - Implement proper validation for Arabic text fields
   - Handle different character count limitations (Arabic characters may take more space)

5. **Content Management**:
   - Support side-by-side editing of content in multiple languages
   - Implement workflow for content translation and approval

6. **URL Structure**:
   - Support Arabic slugs in URLs
   - Handle proper encoding/decoding of Arabic characters in URLs
