import { Avatar, Box, Typography } from '@mui/material';
import { useBlogDetailContext } from '@shared-conntext/BlogPostContext';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import DOMPurify from "dompurify";
import { getBlogPost } from '@shared-api/BlogPosts';

export default function Blog() {
    const router = useRouter();
    const { blogCode } = router.query;
    const [blogDetail, setBlogDetail] = useState();
    React.useEffect(() => {
        if (blogCode) {
            getBlogPost(blogCode).then((data) => {
                if (data) {
                    setBlogDetail(data);
                }
            });
        }
    }, [blogCode])
    const sanitizedHtml = DOMPurify.sanitize(blogDetail?.content || '');


    return (
        <>
            <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 700 }}>
                {blogDetail?.title}
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 400 }}>
                {blogDetail?.subtitle} - {blogDetail?.date} - {blogDetail?.author?.name}
            </Typography>
            {blogDetail?.imageUrl && <Avatar src={blogDetail?.imageUrl} alt={blogDetail?.title}
                sx={{ width: '80%', height: 'auto', borderRadius: '0',

                 }} />}
            {blogDetail?.isHtml ? (
                <Box
                    gutterBottom
                    sx={{ fontSize: 14, color: '#717171', marginBottom: 2 }}
                    dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                />
            ) : (
                <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    fontSize={14}
                    color="#717171"
                >
                    {blogDetail?.content}
                </Typography>
            )}
        </>
    )
}
