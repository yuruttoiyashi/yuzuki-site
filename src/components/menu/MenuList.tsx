import { menuCourses } from '../../data/menus'
import { MenuItem } from './MenuItem'
export function MenuList({ featuredOnly = false }: { featuredOnly?: boolean }) { const courses = featuredOnly ? menuCourses.filter((c) => c.popular) : menuCourses; return <div className="menu-list">{courses.map((course) => <MenuItem key={course.id} course={course} featured={featuredOnly} />)}</div> }
