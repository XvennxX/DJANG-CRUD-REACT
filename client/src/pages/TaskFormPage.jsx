import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const params = useParams()

  const onSubmit = handleSubmit(async data => {
    if (params.id) {
      //updateTask()
    } else {
      await createTask(data);
    }

    navigate('/tasks');
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const res = await getTask(params.id);
        console.log(res)
      }
    }
    loadTask();
  }, [])
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="title"
          {...register('title', { required: true })}
        />
        {errors.title && <span>title is required</span>}

        <textarea
          rows='3'
          placeholder="Description"
          {...register('description', { required: true })}
        ></textarea>
        {errors.description && <span>description is required</span>}

        <button>Save</button>
      </form>

      {params.id && <button onClick={async () => {
        const accepted = window.confirm('are you sure?');
        if (accepted) {
          await deleteTask(params.id);
          navigate('/tasks');
        }
      }}>Delete</button>}
    </div>
  );
}