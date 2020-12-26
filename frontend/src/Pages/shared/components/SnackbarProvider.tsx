import React, { useCallback, useState, useRef, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { createStyles, Snackbar, Theme, WithStyles, withStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.primary.main,
            paddingTop: 0,
            paddingBottom: 0,
        },
    });

type Message = { text: string };
type MessageInfo = { key: number; message: Message } | Record<string, never>;
type PushMessage = (msg: Message) => void;
type SnackbarContextType = { info: PushMessage };
const defaultSnackbarContext = (msg: Message) => console.log(msg);
const SnackbarContext = React.createContext<SnackbarContextType>({ info: defaultSnackbarContext });

function _ConsecutiveSnackbars(props: WithStyles<typeof styles> & { children: React.ReactNode }): JSX.Element {
    const { classes, children } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [messageInfo, setMessageInfo] = useState<MessageInfo>({});
    const queue = useRef<MessageInfo[]>([]);

    const processQueue = useCallback(() => {
        if (queue.current.length > 0) {
            setMessageInfo(queue.current.shift() as MessageInfo);
            setIsOpen(true);
        }
    }, [setMessageInfo, setIsOpen, queue]);

    const handleClose = useCallback(
        (_, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            setIsOpen(false);
        },
        [setIsOpen],
    );

    const pushMessage: PushMessage = useCallback((message: Message) => {
        queue.current.push({
            message,
            key: new Date().getTime(),
        });
        if (isOpen) {
            // immediately begin dismissing current message
            // to start showing new one
            setIsOpen(false);
        } else {
            processQueue();
        }
    }, []);

    return (
        <Fragment>
            <SnackbarContext.Provider value={{ info: pushMessage }}>{children}</SnackbarContext.Provider>
            <Snackbar
                disableWindowBlurListener
                key={messageInfo.key}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={isOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                onExited={processQueue}
                ContentProps={{
                    classes: {
                        root: classes.root,
                    },
                }}
                message={<span>{messageInfo.message ? messageInfo.message.text : null}</span>}
            />
        </Fragment>
    );
}

const SnackbarProvider = withStyles(styles, { withTheme: true })(_ConsecutiveSnackbars);
export default SnackbarProvider;

export function useSnackbar(): SnackbarContextType {
    const context = React.useContext(SnackbarContext);
    if (context === undefined) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
}
export type WithSnackbar = { pushMessageToSnackbar: SnackbarContextType };
export function withSnackbar<T extends WithSnackbar = WithSnackbar>(
    WrappedComponent: React.ComponentType<T>,
): JSX.Element {
    // Try to create a nice displayName for React Dev Tools.
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    const ComponentWithSnackbar = (props: Omit<T, keyof WithSnackbar>) => {
        const pushMessageToSnackbar = useSnackbar();
        return <WrappedComponent pushMessageToSnackbar={pushMessageToSnackbar} {...props} />;
    };
    ComponentWithSnackbar.displayName = `WithSnackbar(${displayName})`;
    return ComponentWithSnackbar;
}
