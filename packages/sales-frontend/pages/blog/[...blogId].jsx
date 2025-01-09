import { Avatar, Typography } from '@mui/material';
import { useBlogDetailContext } from '@shared-conntext/BlogPostContext';
import { useRouter } from 'next/router'
import React from 'react'

export default function Blog() {
    const router = useRouter();
    const { blogId } = router.query;
    const { blog } = useBlogDetailContext();

    return (
        <>
            <Typography variant="h1" sx={{ color: 'text.primary', fontWeight: 700 }}>
                {blog?.title}
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 400 }}>
                {blog?.subtitle} - {blog?.date} - {blog?.author?.name} 
            </Typography>
            {blog?.imageUrl && <Avatar src={blog?.imageUrl} alt={blog?.title}
                sx={{ width: '100%', height: 'auto', borderRadius: '0' }} />}
            {
                isHtml ?
                    <Box dangerouslySetInnerHTML={{ __html: content }} sx={{ color: 'text.primary', fontSize: '15px' }} />
                    : <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 400 }}>
                        {content}
                    </Typography>
            }
        </>
    )
}
