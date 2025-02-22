import { ItemDataContainerCards } from "../../../interfaces/Others.interface";

export const containerCardHomeMapper = (item: any[]): ItemDataContainerCards[] => {
    return item.map(i => {
        return {
            Id: i.Id,
            Name: i.Name,
            Image: i.Image ? i.Iamge : i.Images ? i.Images[0] : ""
        }
    })

}