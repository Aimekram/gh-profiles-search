import '@testing-library/jest-dom'
import { TextEncoder } from 'util'
global.TextEncoder = TextEncoder // fix for ReferenceError: TextEncoder is not defined
