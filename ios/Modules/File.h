//
//  File.h
//  EhdaApp
//
//  Created by Aryan on 3/31/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>

@interface File : NSObject<RCTBridgeModule>
- (NSString*) resolvePath:(NSString*)name;
@end
