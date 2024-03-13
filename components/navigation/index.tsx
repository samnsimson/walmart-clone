import { cn } from "@/lib/utils";
import { Heart, HomeIcon, LayoutGrid, MapPin, Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { SearchBar } from "../searchBar";

interface NavigationProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

interface NavigationListItem extends HTMLAttributes<HTMLLIElement> {
    href?: string;
    fluid?: boolean;
    bgDisabled?: boolean;
}

interface SubNavigation extends HTMLAttributes<HTMLDivElement> {}

const ListItem: FC<NavigationListItem> = ({ children, href = null, fluid, bgDisabled = false, className }) => {
    const list = (
        <li
            className={cn(
                "flex h-12 items-center justify-center rounded-full ",
                "cursor-pointer gap-2 font-semibold text-white duration-200 fade-in-25",
                {
                    "flex-1": fluid,
                    "p-4 hover:bg-primary-dark": !bgDisabled,
                },
                className,
            )}
        >
            {children}
        </li>
    );
    return href ? (
        <Link href={href} legacyBehavior passHref>
            {list}
        </Link>
    ) : (
        list
    );
};

export const Navigation: FC<NavigationProps> = ({ ...props }) => {
    return (
        <div {...props}>
            <ul className="flex max-w-full items-center">
                <ListItem href="/">
                    <Image src="walmartLogo.svg" width={130} height={32} alt="walmart logo" />
                </ListItem>
                <ListItem>
                    <LayoutGrid strokeWidth={1} /> Departments
                </ListItem>
                <ListItem>
                    <LayoutGrid strokeWidth={1} /> Services
                </ListItem>
                <ListItem fluid bgDisabled className="px-4">
                    <SearchBar />
                </ListItem>
                <ListItem className="flex">
                    <Heart strokeWidth={1} size={16} />
                    <Link href="/shop/favourites" className="leading-2">
                        <div className="text-xs font-normal leading-[12px]">Reorder</div>
                        <div className="leading-tight">My Items</div>
                    </Link>
                </ListItem>
                <ListItem className="flex">
                    <User strokeWidth={1} size={16} />
                    <div className="leading-2">
                        <div className="text-xs font-normal leading-[12px]">Sign In</div>
                        <div>Account</div>
                    </div>
                </ListItem>
                <ListItem className="flex">
                    <Link href="/cart" className="leading-2">
                        <ShoppingCart strokeWidth={1} size={20} />
                        <div className="text-xs font-normal leading-[12px]">$0.0</div>
                    </Link>
                </ListItem>
            </ul>
        </div>
    );
};

const subnavLinks = [
    "Deals",
    "Grocery & Essentials",
    "Valentine's Day",
    "Game Time",
    "Black & Unlimited",
    "Fashion",
    "Home",
    "Electronics",
    "Auto",
    "Registry",
    "ONE Debit",
];

export const SubNavigation: FC<SubNavigation> = () => {
    return (
        <div className=" flex h-10 items-center bg-primary px-4">
            <div className="px-4">
                <div className="flex">
                    <div className="flex items-center space-x-3 text-white">
                        <Image
                            src="https://i5.walmartimages.com/dfw/4ff9c6c9-ad46/k2-_0a671c38-d307-447c-835e-7904ab143c26.v1.png"
                            width={26}
                            height={26}
                            alt="some image"
                        />
                        <p className="text-sm font-semibold">How do you want your items?</p>
                    </div>
                    <Separator orientation="vertical" className="mx-3 h-[10] bg-white" />
                    <div className="flex items-center space-x-3 text-sm text-white">
                        <MapPin strokeWidth={1} size={20} />
                        <p>Jacksonville, 32246</p>
                        <HomeIcon strokeWidth={1} size={20} />
                        <p>Jacksonville Super Center</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 justify-end px-4">
                <ul className="flex max-w-max gap-5">
                    {subnavLinks.map((link, key) => (
                        <Link href="#" passHref key={key}>
                            <li className="text-sm font-bold text-white hover:underline">{link}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};
