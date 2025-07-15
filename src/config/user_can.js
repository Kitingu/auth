const userCan = (user, action) => {
    // check if action in user.roles array

    if (user.roles && user.roles.includes(action)) {
        return true;
    }
    return false;
}

export default userCan;

