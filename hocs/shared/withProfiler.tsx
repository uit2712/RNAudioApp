import React, { Profiler, ProfilerOnRenderCallback } from 'react';

export function withProfilerHOF(WrappedComponent: React.ComponentType, id: string) {
    return function () {
        return (
            <Profiler id={id} onRender={onRenderCallback}>
                <WrappedComponent/>
            </Profiler>
        )
    }
}

export function withProfilerHOC(WrappedComponent: React.ComponentType, id: string) {
    return class extends React.Component {
        render() {
            return (
                <Profiler id={id} onRender={onRenderCallback}>
                    <WrappedComponent/>
                </Profiler>
            )
        }
    }
}

function onRenderCallback(
    id: string,
    phase: 'mount' | 'update',
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
    interactions: Set<any>,
) {
    // Aggregate or log render timings...
    console.log(`${id}: phase - ${phase}, actualDuration - ${actualDuration}, start - ${startTime}, end - ${commitTime}`);
}