import { supabase } from '../lib/supabase';

export const uploadAvatar = async (uri, userId) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`${userId}/${Date.now()}`, blob, {
            cacheControl: '3600',
            upsert: true,
        });

    if (error) {
        console.error('Error uploading avatar:', error);
        return null;
    }

    const avatarUrl = supabase.storage.from('avatars').getPublicUrl(data.path).publicUrl;
    return avatarUrl;
};

export const updateUserData = async (userId, updates) => {
    const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId);

    if (error) {
        console.error('Error updating user data:', error);
        return null;
    }

    return data;
};
