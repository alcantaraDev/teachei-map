import { env } from "@/env";
import { Client } from "@notionhq/client";

export const Notion = new Client({
    auth: env.NOTION_SECRET
})