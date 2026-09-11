import { Link } from 'react-router-dom'
import { formatPrice, type MenuCourse } from '../../data/menus'

export function MenuItem({ course, featured = false }: { course: MenuCourse; featured?: boolean }) {
  return <article className={`menu-item ${featured ? 'featured' : ''}`}>
    {course.popular && <p className="popular">MOST POPULAR</p>}
    <div className="menu-title">
      <div><h3>{course.name}</h3><p>{course.subtitle}</p></div>
      <p className="menu-price"><strong>{course.duration}分</strong><b>{formatPrice(course.price)}</b></p>
    </div>
    <p className="menu-description">{course.description}</p>
    <ul className="treatment-list">{course.treatment.map((item) => <li key={item}>{item}</li>)}</ul>
    <div className="recommended-for"><h4>こんなお悩みに</h4><ul>{course.recommendedFor.map((item) => <li key={item}>{item}</li>)}</ul></div>
    {featured && <Link className="text-link" to="/reserve">このコースを予約する <span aria-hidden="true">→</span></Link>}
  </article>
}
