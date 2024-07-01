import { Badge } from '@mantine/core'
import { BadgeComponentProp } from '../../Types/apiTypes'



const BadgeComponent: React.FC<BadgeComponentProp> = ({ datos }) => {
  return (
    <Badge variant="light" color={datos.color}>{datos.titulo}</Badge>
  )
}

export default BadgeComponent
