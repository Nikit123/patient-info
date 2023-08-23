export const calculateAge = (birthDateString) => {
    const birthDate = new Date(birthDateString);
    const currentDate = new Date();

    const yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();
    const monthsDiff = currentDate.getMonth() - birthDate.getMonth();
    const daysDiff = currentDate.getDate() - birthDate.getDate();

    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
        return yearsDiff - 1;
    }
    return yearsDiff;
}