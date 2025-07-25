import { Button } from '@/components/ui/button';
import { Button as ButtonType } from '@/services/blogpostbyslug.service';
import Link from 'next/link';


interface ButtonProps {
    banner: ButtonType;
}

export const ButtonComponent: React.FC<ButtonProps> = ({ banner }) => {
    return (
        <div className='py-4 px-0 sm:px-4'>
            <Button >
                <Link aria-label={banner.title + " link"} href={banner.link}>
                    {banner.title}
                </Link>
            </Button>
        </div>
    );
}