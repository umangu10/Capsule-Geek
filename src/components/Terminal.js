import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

const TerminalComponent = () => {
  const terminalRef = useRef(null);

  useEffect(() => {
    const terminal = new Terminal();
    terminal.open(terminalRef.current);

    terminal.write('Welcome to the Pentesting Lab!\r\n');
    terminal.write('Type "help" for a list of commands.\r\n');

    terminal.onData(data => {
      // Handle input and command execution here
      terminal.write(`\r\nYou typed: ${data}`);
    });

    return () => {
      terminal.dispose();
    };
  }, []);

  return <div ref={terminalRef} style={{ height: '400px', width: '100%' }} />;
};

export default TerminalComponent; 