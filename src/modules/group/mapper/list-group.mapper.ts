import GroupDTO from '../dto/group.dto';

export function mapToGroupListDTO(
  group: {
    createdBy: {
      name: string;
    };
  } & {
    id: string;
    name: string;
    createdByUsedId: string;
  },
): GroupDTO {
  return {
    createdByUser: group.createdBy.name,
    name: group.name,
    id: group.id,
  };
}
