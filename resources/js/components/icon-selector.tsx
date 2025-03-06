import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Book, Building2, FileText, Folder, FolderTree, Home, Image, LayoutGrid, LogIn, Menu, Newspaper, Settings, UserPlus, Users } from "lucide-react"

const iconMap = {
    "Home": Home,
    "Users": Users,
    "Building2": Building2,
    "Bell": Bell,
    "FileText": FileText,
    "LogIn": LogIn,
    "UserPlus": UserPlus,
    "Menu": Menu,
    "Newspaper": Newspaper,
    "Book": Book,
    "Image": Image,
    "Settings": Settings,
    "LayoutGrid": LayoutGrid,
    "Folder": Folder,
    "FolderTree": FolderTree,
}

interface IconSelectorProps {
    value: string
    onChange: (value: string) => void
}

export function IconSelector({ value, onChange }: IconSelectorProps) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select an icon" />
            </SelectTrigger>
            <SelectContent>
                {Object.entries(iconMap).map(([name, Icon]) => (
                    <SelectItem key={name} value={name}>
                        <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span>{name}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
} 