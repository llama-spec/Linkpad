import React from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const UserTypeSelector = ({ userType, setUserType, onClickHandler, creatorId }: UserTypeSelectorParams) => {

    const accessChangeHandler = (type: UserType) => {
        setUserType(type)
        onClickHandler && onClickHandler(type)
    }

    // console.log(creatorId)

    return (
        <Select  value={userType} onValueChange={(type: UserType) => accessChangeHandler(type)}>
            <SelectTrigger className="shad-select">
                <SelectValue />
            </SelectTrigger>
            <SelectContent className='border-none bg-[#191919]'>
                <SelectItem value="viewer" className='shad-select-item'>can view</SelectItem>
                <SelectItem value="editor" className='shad-select-item'>can edit</SelectItem>
            </SelectContent>
        </Select>
    )
}

export default UserTypeSelector