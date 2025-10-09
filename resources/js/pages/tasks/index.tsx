import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { type BreadcrumbItem } from '@/types';
import tasksRoutes from "@/routes/tasks";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import AppPagination from "@/components/app-pagination"
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { ToastContainer, toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: tasksRoutes.index().url,
    },
];

export default function Index({ tasks }) {
    const { t } = useLaravelReactI18n();
    const { delete: destroy } = useForm();
    const notify = () => toast.info(t('common.task_deleted'));

    function submit(e) {
        e.preventDefault();
        destroy(tasksRoutes.destroy({ id: e.target.id }).url);

    }
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <ToastContainer />
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
                    {tasks.data.length > 0 ? (
                        tasks.data.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell className="font-medium">
                                    <Link
                                        href={tasksRoutes.show({ task }).url}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {task.title}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {task.description.length > 30
                                        ? task.description.slice(0, 30) + '...'
                                        : task.description}
                                </TableCell>
                                <TableCell>
                                    {t(`common.status.${task.status}`)}
                                </TableCell>
                                <TableCell>
                                    {new Date(
                                        task.due_date,
                                    ).toLocaleDateString()}
                                </TableCell>
                                <TableCell>{task.user.name}</TableCell>
                                <TableCell><Link href={tasksRoutes.edit({ task }).url} className="text-blue-600 hover:underline">Edit</Link></TableCell>
                                <TableCell>
                                    <form onSubmit={submit} id={task.id}>
                                        <button
                                            type="submit"
                                            onClick={notify}
                                            className="cursor-pointer text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </form>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                <div>No tasks found.</div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {tasks.links.length > 3 && <AppPagination links={tasks.links} />}
        </AppLayout>
    );
}
