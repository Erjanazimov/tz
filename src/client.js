import {createClient} from "@supabase/supabase-js";


const supabase = createClient("https://xcadwlynvdjhgvpyravw.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjYWR3bHludmRqaGd2cHlyYXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDY4OTgxNzMsImV4cCI6MTk2MjQ3NDE3M30.jeGWMHubVS1X3U7oI0jvkt_T3uRz9VnB5jJBj1VHTNI"
    )
export {
    supabase
}