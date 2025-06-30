import { IoCloseCircleSharp, IoSearch } from "react-icons/io5";
import { Button, useDisclosure, Dialog, Portal, Input, InputGroup, Box, Badge, Separator  } from "@chakra-ui/react"
import { Kbd } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useSkills } from '@/hooks/useSkills';
import { SkillDescription } from "../SkillDescription/SkillDescription";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useCategoriesStore } from "@/store/categoriesStore";
import { useDomainsStore } from "@/store/domainsStore";
import { CategoryDescription } from "../ui/CategoryDescription";



export function NavigationSearch() {
    const { open, onOpen, setOpen } = useDisclosure()
    const [searchQuery, setSearchQuery] = useState("");

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === "/") {
            event.preventDefault();
            onOpen();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        }
    }, []);

  const {
    data: skillsData,
    isLoading,
    isFetching,
  } = useSkills({
    limit: 5,
    offset: 0,
    period: 30,
    skillName: searchQuery || undefined,
    orderBy: {
        column: 'count',
        asc: true
    }
  });
    
    const domains = useDomainsStore((state) => state.domains);
    const categories = useCategoriesStore((state) => state.categories);

    return (
        <div>
            <Button onClick={onOpen} className='size-full h-8 hover:bg-background-gray w-56 text-sm px-2 py-1 bg-background-secondary cursor-pointer rounded text-text-secondary flex items-center justify-between'>
                <div className="flex">
                    <div className='mr-2'>
                        <IoSearch/>
                    </div>
                    <div>
                        Search
                    </div>
                </div>
                <div className='text-xs text-text bg-background-primary w-5 flex items-center justify-center rounded aspect-square'>
                    <Kbd>/</Kbd>
                </div>
            </Button>


        <div>
            <Dialog.Root scrollBehavior="inside" open={open}  closeOnEscape={true} 
                onOpenChange={(isOpen) => {
                    setOpen(isOpen.open)
            }} size={'xl'} placement={'bottom'}>
                <Portal>
                    <Dialog.Backdrop className="backdrop-blur-sm bg-black/30" />
                    <Dialog.Positioner>
                    <Dialog.Content className="h-full border-background-secondary border-2 rounded-md text-sm !bg-transparent border-none shadow-none !p-0 !m-0">

                    <Dialog.Body className="!opacity-100 !bg-transparent overflow-hidden h-full">
                        <div className="!opacity-100 bg-background-primary rounded-md border-2 border-background-secondary">
                            <div className="text-text-secondary flex gap-2 items-center px-2 py-1">
                                <div>
                                    <IoSearch />
                                </div>
                                <div className="w-full">
                                    <InputGroup endElement={<IoCloseCircleSharp onClick={() => setOpen(false)} size={20} className="p-0 m-0 flex items-center justify-center cursor-pointer text-text-secondary hover:text-text-secondary/50" />}>
                                        <Input placeholder="Search" variant="flushed"   value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}/>
                                    </InputGroup>  
                                </div>
                            </div>
                            <div className="bg-background-gray/50 text-text-secondary flex gap-2 items-center px-2 py-">
                                <div className="py-2 flex justify-between w-full">
                                    <div className="flex items-center gap-1">
                                        <div>Navigate</div>
                                        <div><Kbd className="aspect-square flex items-center justify-center">&#8593;</Kbd></div>
                                        <div><Kbd className="aspect-square flex items-center justify-center">&#8595;</Kbd></div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div>Close</div>
                                        <div><Kbd>esc</Kbd></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-4"></div>


                        <div className="!opacity-100 bg-background-primary p-4 rounded-md overflow-auto max-h-[80%]">
                            <div>
                                <div className="flex pb-2 text-text-secondary items-center">
                                    <div>
                                        Skills
                                    </div>
                                    <div className="mx-1">
                                        <Badge variant="outline">
                                            {skillsData?.skills?.length}
                                        </Badge>
                                    </div>
                                </div>
                                <div>
                                    {
                                        skillsData?.skills.map(skill => <div key={skill.name}><SkillDescription {...skill}/></div>)
                                    }
                                </div>
                            </div>


                            <div>
                                <div className="flex pb-2 text-text-secondary items-center">
                                    <div>
                                        Domains
                                    </div>
                                    <div className="mx-1">
                                        <Badge variant="outline">
                                            {domains?.length}
                                        </Badge>
                                    </div>
                                </div>
                                <div>
                                    {
                                        domains?.map(domain => <div key={domain.name}><CategoryDescription categoryKey="domain" categoryName={domain.name}/></div>)
                                    }
                                </div>
                            </div>

                            <div>
                                <div className="flex pb-2 text-text-secondary items-center">
                                    <div>
                                        Categories
                                    </div>
                                    <div className="mx-1">
                                        <Badge variant="outline">
                                            {categories?.length}
                                        </Badge>
                                    </div>
                                </div>
                                <div>
                                    {
                                        categories?.map(domain => <div key={domain.name}><CategoryDescription categoryKey="category" categoryName={domain.name}/></div>)
                                    }
                                </div>
                            </div>

                        </div>

                      

       
                    </Dialog.Body>   
                    </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
                </Dialog.Root>
            </div>
        </div>
    )
}