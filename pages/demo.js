import { query } from "@/utils/db";


export default function Page({data}){

// console.log(data)
  return(<>
    <h1>This is demo page</h1>
  </>)
}


export async function getServerSideProps(){


  const sql =`select wp_posts.ID, wp_posts.post_title, wp_posts.post_name as
  post_slug, DATE_FORMAT(wp_posts.post_date, '%Y-%m-%d %T.%f') as post_date, (select for_image.guid from wp_posts as
  for_image where for_image.post_parent = wp_posts.ID and for_image.post_type =
  "attachment" limit 1) as post_thumbnail from wp_posts where
  (wp_posts.post_type = 'post' and wp_posts.post_status = 'publish') order by
  wp_posts.ID desc limit 3`;


  const data = await query(sql);

  return(
    {
      props:{
        data:data
      }
    }
  )
}