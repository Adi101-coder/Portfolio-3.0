import { supabase } from './config';

const TABLE_NAME = 'contact_submissions';

// Add a new contact submission
export const addContactSubmission = async (formData) => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'No Subject',
          message: formData.message,
          read: false,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) throw error;

    console.log('Contact submission added:', data);
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error adding contact submission:', error);
    return { success: false, error: error.message };
  }
};

// Get all contact submissions (for admin)
export const getAllSubmissions = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error getting submissions:', error);
    return { success: false, error: error.message };
  }
};

// Delete a submission (for admin)
export const deleteSubmission = async (submissionId) => {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', submissionId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error deleting submission:', error);
    return { success: false, error: error.message };
  }
};

// Mark submission as read (for admin)
export const markAsRead = async (submissionId) => {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .update({ read: true })
      .eq('id', submissionId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error marking as read:', error);
    return { success: false, error: error.message };
  }
};

