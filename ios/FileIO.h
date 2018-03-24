//
//  FileIO.h
//  temp
//
//  Created by Aryan on 3/24/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface FileIO : NSObject <RCTBridgeModule>
- (NSString*) resolvePath:(NSString*)name;
@end
