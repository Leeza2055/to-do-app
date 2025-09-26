import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import { type BreadcrumbItem } from '@/types';
import tasks from '@/routes/tasks';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: tasks.create().url,
    },
];

export default function Create() {
    const { data, setData, post, errors, processing, clearErrors } = useForm({
        title: '',
        description: '',
        due_date: '',
    });

    function submit(e) {
        e.preventDefault();
        post(tasks.store().url);
    }

    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="px-4 py-6">
                <form onSubmit={submit}
                    className="mx-auto flex max-w-md flex-col gap-4"
                    method="POST"
                    action={tasks.store().url}
                >
                    <input
                        type="text"
                        placeholder="Title"
                        className={`rounded-md border border-gray-300 p-2 ${errors.title ? 'border-red-600' : ''}`}
                        value={data.title}
                        onChange={(e) => {
                            setData('title', e.target.value)
                            clearErrors('title');
                        }}
                    />
                    {errors.title && <div className="text-sm text-red-600">{errors.title}</div>}
                    <textarea
                        placeholder="Description"
                        className={`rounded-md border border-gray-300 p-2 ${errors.description ? 'border-red-600' : ''}`}
                        rows={4}
                        value={data.description}
                        onChange={(e) => {
                            setData('description', e.target.value)
                            clearErrors('description');
                        }}
                    />
                    {errors.description && <div className="text-sm text-red-600">{errors.description}</div>}
                    <input
                        type="date"
                        value={data.due_date}
                        placeholder="Due Date"
                        className={`rounded-md border border-gray-300 p-2 ${errors.due_date ? 'border-red-600' : ''}`}
                        onChange={(e) => {
                            setData('due_date', e.target.value)
                            clearErrors('due_date');
                        }}
                    />
                    {errors.due_date && <div className="text-sm text-red-600">{errors.due_date}</div>}
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
                    >
                        Create Task
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
