import { DotsVerticalIcon, FolderRemoveIcon, PencilAltIcon } from "@heroicons/react/outline"
import Link from "next/link"
import React, { useState } from "react"
import { Category } from "../pages/api/types"

interface CategoryDropdownProps {
	isDropdownOpen: boolean,
	setIsEditing: any
	setIsDropdownOpen: any
}

const CategoryDropdown : React.FC<CategoryDropdownProps> = ({
	isDropdownOpen, 
	setIsEditing,
	setIsDropdownOpen
}) => {
	return (
		<>
		{
			isDropdownOpen && 
				<ul className="bg-gray-100 w-32 absolute text-sm font-normal top-8 right-3 rounded-sm shadow-xl">
					<li 
						className="border-b-2 border-gray-100 py-1 hover:bg-gray-300 px-2 cursor-pointer flex"
						onClick={(e) => {
							e.preventDefault()
							setIsEditing(true)
							setIsDropdownOpen(false)
						}}
					>
						<PencilAltIcon className="w-5 h-5 mr-2"/>
						Rename
					</li>
					<li className="border-gray-100 py-1 hover:bg-gray-300 px-2 cursor-pointer flex">
						<FolderRemoveIcon className="w-5 h-5 mr-2"/>
						Delete
					</li>
				</ul>
		}
		</>
	)
}

interface CategoryListItemProps {
	category: Category
}

const CategoryListItem : React.FC<CategoryListItemProps> = ({category}) => {
	const [value, setValue] = useState<string>("")
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	return (
		// TODO return id from server
		// <Link href={`/categories/${category.id}`} passHref>
		<Link as={`/categories/${category.id}`} href="/categories/[id]" passHref>

			<a>
				<li className="bg-white shadow-sm hover:shadow-md transition text-lg font-bold h-28 rounded-md flex justify-center items-center relative cursor-pointer">
					{!isEditing && (
						<DotsVerticalIcon 
							className="w-5 h-5 absolute text-gray-400 top-0 right-0 m-2 cursor-pointer" 
							onClick={(e) => {
								e.preventDefault()
								e.stopPropagation()
								setIsDropdownOpen(!isDropdownOpen)
							}}
						/>
					)}

					{ isDropdownOpen && <CategoryDropdown 
							isDropdownOpen={isDropdownOpen} 
							setIsEditing={setIsEditing}
							setIsDropdownOpen={setIsDropdownOpen}
						/>
					}

					{!isEditing ? category.name : (
						<div>
							<input 
								type="text" 
								value={value === "" ? category.name : value} onChange={(e) => setValue(e.target.value)}
							/>

							{/* Buttons */}
							<div>
								<button 
									className="text-sm bg-gray-900 hover:bg-gray-600 text-white px-2 rounded"
									// disabled={value === ""}
									disabled={true}
								>
									Save
								</button>

								<button 
									className="text-sm bg-red-500 hover:bg-red-400 text-white px-2 ml-2 rounded"
									onClick={(e) => {
										e.preventDefault()
										setIsEditing(false)
									}}	
								>
									Cancel
								</button>
							</div>
						</div>
					)}
				</li>
			</a>
		</Link>
	)
}

export default CategoryListItem