type ErrorType = 'diagnostic' | 'lint';
type Severity = 'error' | 'warning';

interface NormalizedMessageJson {
    type: ErrorType;
    code: string | number;
    severity: Severity;
    content: string;
    file: string;
    line: number;
    character: number;
}

export interface NormalizedMessage {
    type: ErrorType;
    code: string | number;
    severity: Severity;
    content: string;
    file: string;
    line: number;
    character: number;
    toJSON(): NormalizedMessageJson;
    getType(): ErrorType;
    isDiagnosticType(): boolean;
    isLintType(): boolean;
    getCode(): string | number;
    getFormattedCode(): string | number;
    getSeverity(): Severity;
    isErrorSeverity(): boolean;
    isWarningSeverity(): boolean;
    getContent(): string;
    getFile(): string;
    getLine(): number;
    getCharacter(): number;
}
