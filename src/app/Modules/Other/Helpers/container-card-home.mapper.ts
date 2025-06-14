import { IItemDataContainerCards } from "../Interface/Others.interface"

export const containerCardHomeMapper = (item: any[]): IItemDataContainerCards[] => {
    return item.map(i => {
        return {
            Id: i.Id,
            Name: i.Name,
            Image: i.Image ? i.Image : i.Images ? i.Images[0] : ""
        }
    })

}