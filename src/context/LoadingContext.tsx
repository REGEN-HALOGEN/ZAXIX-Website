"use client";

import * as React from "react";

type LoadingContextType = {
    isLoaded: boolean;
    setIsLoaded: (value: boolean) => void;
};

const LoadingContext = React.createContext<LoadingContextType>({
    isLoaded: false,
    setIsLoaded: () => { },
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [isLoaded, setIsLoaded] = React.useState(false);

    return (
        <LoadingContext.Provider value={{ isLoaded, setIsLoaded }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    return React.useContext(LoadingContext);
}
