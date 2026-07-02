export const countAverage = ({good, neutral, bad}) => {
    console.log({good, neutral, bad})
    const amountOfReviews = good + neutral + bad;
    if (amountOfReviews === 0) return 0;

    return (good - bad) / amountOfReviews;
};


export const getRandomIndexFromArray = (arrayLength) => {
    return getRandomIntegerIncluding(0, arrayLength - 1);
}

export const getRandomIntegerIncluding = (min, max) => {
    if (min > max) throw new RangeError('min must be greater than max');
    return Math.floor(Math.random() * (max - min + 1)) + min;
}