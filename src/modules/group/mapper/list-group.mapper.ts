import GroupDTO from '../dto/group.dto';

export function mapToGroupListDTO(group: {
  id: string;
  name: string;
  createdByUsedId: string;
}): GroupDTO {
  return {
    createdByUserId: group.createdByUsedId,
    name: group.name,
    id: group.id,
  };
}
