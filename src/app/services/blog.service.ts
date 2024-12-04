import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogs = [
    {
      id: 1,
<<<<<<< HEAD
=======
      title: '¿Qué es Angular y cómo empezar?',
>>>>>>> f7e00d106f1ed2ab2e89fb20306bd10d377a4dc8
      user: { name: 'Jane Doe', profile: 'https://via.placeholder.com/50' },
      date: '2024-12-01',
      content: 'Contenido del blog informativo 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      type: 'informativo',
<<<<<<< HEAD
    },
    {
      id: 2,
=======
      image: 'https://via.placeholder.com/600x300',
    },
    {
      id: 2,
      title: 'Resolviendo dudas de programación',
>>>>>>> f7e00d106f1ed2ab2e89fb20306bd10d377a4dc8
      user: { name: 'John Smith', profile: 'https://via.placeholder.com/50' },
      date: '2024-11-29',
      content: 'Contenido del blog consulta 1. Curabitur pharetra, enim id facilisis ultricies, nunc urna cursus nunc.',
      type: 'consulta',
<<<<<<< HEAD
=======
      image: '',
>>>>>>> f7e00d106f1ed2ab2e89fb20306bd10d377a4dc8
    },
    {
      id: 3,
      user: { name: 'Alice Johnson', profile: 'https://via.placeholder.com/50' },
      date: '2024-11-25',
      content: 'Contenido del blog informativo 2. Proin luctus mi ut ligula feugiat, non vulputate augue pharetra.',
      type: 'informativo',
    },
    {
      id: 4,
      user: { name: 'Bob Brown', profile: 'https://via.placeholder.com/50' },
      date: '2024-11-20',
      content: 'Contenido del blog consulta 2. Fusce facilisis tortor id libero tempor, id facilisis ligula laoreet.',
      type: 'consulta',
    },
  ];

  getBlogs(type: string = '', pageIndex: number = 0, pageSize: number = 5) {
    let filteredBlogs = this.blogs;

    // Filtrado por tipo (informativo o consulta)
    if (type) {
      filteredBlogs = this.blogs.filter(blog => blog.type === type);
    }

    // Paginación
    const startIndex = pageIndex * pageSize;
    const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + pageSize);

    return {
      blogs: paginatedBlogs,
      totalBlogs: filteredBlogs.length,
    };
  }
<<<<<<< HEAD
}
=======
  getBlogById(id: number) {
    return this.blogs.find(blog => blog.id === id);
  }
  

}

>>>>>>> f7e00d106f1ed2ab2e89fb20306bd10d377a4dc8
