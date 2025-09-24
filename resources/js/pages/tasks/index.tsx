import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { type BreadcrumbItem } from '@/types';
import tasks from "@/routes/tasks";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: tasks.index().url,
    },
];

export default function Index({ tasks }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>User</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.length > 0 ? tasks.map((task) => (
                        <TableRow key={task.id}>
                            <TableCell className="font-medium">
                                {task.title}
                            </TableCell>
                            <TableCell>{task.description.slice(0, 30)}...</TableCell>
                            <TableCell>{task.status}</TableCell>
                            <TableCell>
                                {new Date(task.due_date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                {task.user.name}
                            </TableCell>
                        </TableRow>
                    )) :
                    <TableRow><TableCell colSpan={5} className="text-center"><div>No tasks found.</div></TableCell></TableRow>}
                </TableBody>
            </Table>
        </AppLayout>
    );
}
