export const countAverage = ({good, neutral, bad}) => {
    console.log({good, neutral, bad})
    const amountOfReviews = good + neutral + bad;
    if (amountOfReviews === 0) return 0;

    return (good - bad) / amountOfReviews;
};