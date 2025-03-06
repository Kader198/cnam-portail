import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Activity, BarChart2, Clock, FileText, FolderTree, Image, Shield, UserCheck, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Stats {
    total_users: number;
    total_content: number;
    total_roles: number;
    recent_users: Array<{
        id: number;
        name: string;
        email: string;
        created_at: string;
    }>;
    recent_content: Array<{
        id: number;
        title: string;
        created_at: string;
    }>;
    content_stats: {
        published: number;
        unpublished: number;
        by_type: Array<{
            content_type: string;
            count: number;
        }>;
    };
    user_activity: {
        recent_audit_logs: Array<{
            log_id: number;
            user: {
                name: string;
            };
            action: string;
            entity_type: string;
            timestamp: string;
        }>;
        active_users: number;
    };
    recent_versions: Array<{
        version_id: number;
        content: {
            title: string;
        };
        author: {
            name: string;
        };
        created_at: string;
    }>;
    media_stats: {
        total_media: number;
        by_type: Array<{
            media_type: string;
            count: number;
        }>;
    };
    category_stats: Array<{
        category_id: number;
        name: string;
        contents_count: number;
    }>;
    role_stats: Array<{
        role_id: number;
        role_name: string;
        users_count: number;
    }>;
}

interface Props {
    stats: Stats;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function Dashboard({ stats }: Props) {
    const contentChartData = [
        { name: 'Published', value: stats.content_stats.published },
        { name: 'Unpublished', value: stats.content_stats.unpublished },
    ];

    const mediaChartData = stats.media_stats.by_type.map(type => ({
        name: type.media_type,
        value: type.count
    }));

    const categoryChartData = stats.category_stats.map(category => ({
        name: category.name,
        value: category.contents_count
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <Card className="relative overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_users}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.user_activity.active_users} active in last 7 days
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_content}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.content_stats.published} published
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Media</CardTitle>
                            <Image className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.media_stats.total_media}</div>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_roles}</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Content Status</CardTitle>
                            <BarChart2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={contentChartData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {contentChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {stats.user_activity.recent_audit_logs.map((log) => (
                                    <div key={log.log_id} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                <span className="text-sm font-medium text-primary">
                                                    {log.user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="font-medium">{log.user.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    {log.action} - {log.entity_type}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(log.timestamp).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Category Distribution</CardTitle>
                            <FolderTree className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={categoryChartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Role Distribution</CardTitle>
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {stats.role_stats.map((role) => (
                                    <div key={role.role_id} className="flex items-center justify-between">
                                        <div className="font-medium">{role.role_name}</div>
                                        <div className="text-sm text-gray-500">
                                            {role.users_count} users
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Recent Content Versions</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {stats.recent_versions.map((version) => (
                                    <div key={version.version_id} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                <FileText className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <div className="font-medium">{version.content.title}</div>
                                                <div className="text-sm text-gray-500">by {version.author.name}</div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(version.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Media Types</CardTitle>
                            <Image className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={mediaChartData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {mediaChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
