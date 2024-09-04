import { supabase } from "../lib/supabase"

export const getUserData = async (userId) => {
    const { data, error } = await supabase.from("users")
        .select('*')
        .eq('id', userId)
        .single()
    if (error) {
        return { error }
    }
    else {
        return data
    }
}